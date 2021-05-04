from flask import Flask, render_template, request, redirect
from flask_mysqldb import MySQL
from flask_cors import cross_origin

from noteApp import noteApp
from noteEntity import Note

#Initialize server app
server = noteApp()

#Rest Endpoints to control noteApp operations
#Home Page
@server.app.route("/")
@cross_origin(origins=['http://localhost:3000'])
def homePage():
    return "Root page"

#/getNote, returns note or notes 
@server.app.route("/getNote", methods=['POST'])
@cross_origin(origins=['http://localhost:3000'])
def getNote():
    if request.method == 'POST':
        return server.getNoteFromDb(request.get_json(force=True))

#/deleteNote deletes note from database
@server.app.route("/deleteNote", methods=['POST'])
@cross_origin(origins=['http://localhost:3000'])
def deleteNote():
    if request.method == 'POST':
        return server.deleteNoteFromDb(request.get_json(force=True))

#/insertNote inserts note to db 
@server.app.route("/insertNote", methods=['POST'])
@cross_origin(origins=['http://localhost:3000'])
def insertNote():
    if request.method == 'POST':
        newNote = Note.createWithJson(request.get_json(force=True))
        server.insertNoteToDb(newNote)
        return "OK"

#/login adds the Google User into database
@server.app.route("/login", methods=['POST'])
@cross_origin(origins=['http://localhost:3000'])
def login():
    if request.method == 'POST':
        server.addGoogleUser(request.get_json(force=True))
        return "OK"

if __name__ == "__main__":
    server.app.run()
