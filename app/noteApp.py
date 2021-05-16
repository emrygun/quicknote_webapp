from flask import Flask, json, jsonify, request, redirect
from flask_mysqldb import MySQL
from flask_cors import CORS

from utils import Content, DatabaseYamlParser
from noteAppDbInstance import NoteAppDbInstance
from noteEntity import Note

serverInitMessage       = "SERVER INITIALIZED\nDATABASE CONFIGURATION:"
serverRunningMessage    = "SERVER IS RUNNING NOW\n"
escapeSequence          = print(chr(27) + "[2J")

class noteApp:
    def __init__(self):
        #Initialize messages
        print(serverInitMessage)

        #Initialize Flask application and Cross Origin Configurations
        self.app = Flask(__name__)

        #Yaml entry name of corresponding database
        DatabaseSettings = DatabaseYamlParser("docker_db")
        self.DbInstance = NoteAppDbInstance.getInstance()    \
                    .setDatabaseSettings(DatabaseSettings)   \
                    .setCursorClass("DictCursor")            \
                    .setCorsHeader("Content-Type")           \
                    .setApp(self.app)                        \
                    .build()

        #Server running message
        print(serverRunningMessage)


    #CRUD Operations

    #Adds the new Google User to database
    #Returns 500 Internal Server Error if the user already exists in database
    def addGoogleUser(self, content):
        if Content.isGoogleProfile(content):
            try:
                self.DbInstance.getMySQL().connection.cursor() \
                .execute("INSERT INTO googleUser "
                         "(googleId, imageUrl, email, name, givenName, familyName) "
                         "VALUES (%s, %s, %s, %s, %s, %s)",
                             (content.get('googleId'),
                              content.get('imageUrl'),
                              content.get('email'),
                              content.get('name'),
                              content.get('givenName'),
                              content.get('familyName')))
                self.DbInstance.getMySQL().connection.commit()
                return True
            except:
                print("User already registered.")
        else:
            print("server: The object you passed is not Note object")
            return False

    #Inserts note to defined database. Takes Note class
    def insertNoteToDb(self, note):
        if (type(note) is Note):
            self.DbInstance.getMySQL().connection.cursor() \
            .execute("INSERT INTO userNotes "
                     "(title, text, isPublic, author) "
                     "VALUES (%s, %s, %r, %s)",
                         (note.noteTitle,
                          note.noteText,
                          note.noteIsPublic,
                          note.noteAuthor))
            self.DbInstance.getMySQL().connection.commit()
            return True
        else:
            print("server: Content is not GoogleProfile")
            return False

    def deleteNoteFromDb(self, content):
        self.DbInstance.getMySQL().connection.cursor() \
        .execute("DELETE From userNotes "
                 "WHERE noteId = '%s' AND author = %s",
                 [content.get('token'), content.get('googleId')])
        self.DbInstance.getMySQL().connection.commit()
        return jsonify("OK")

    def editNoteFromDb(self, content):
        self.DbInstance.getMySQL().connection.cursor() \
        .execute("UPDATE userNotes "
                 "SET text = %s "
                 "WHERE noteId = '%s'",
                 [content.get('text'), content.get('token')])
        self.DbInstance().getMySQL().connection.commit()

        self.DbInstance.getMySQL().connection.cursor(). \
        execute("INSERT INTO noteEdit "
                "(author, noteId) VALUES (%s)",
                [content.get('googleId'), content.get('token')])
        self.DbInstance.getMySQL().connection.commit()
        return jsonify("OK")

    def getNoteFromDb(self, content):
        #If token = None, It's a list request
        if Content.isNoteRequest(content):
            cursor = self.DbInstance.getMySQL().connection.cursor()
            #Get all notes 
            if content.get("token") == 0:
                cursor \
                .execute("SELECT title, text, noteId, date, isPublic "
                         "FROM userNotes "
                         "WHERE author = %s",
                         [content.get("googleId")])

                return jsonify(cursor.fetchall())
            #Get note with token
            else:
                cursor \
                .execute("SELECT title, text, noteId, date, isPublic "
                         "FROM userNotes "
                         "WHERE noteId = '%s' AND isPublic = 1",
                         [content.get("token")])
                return jsonify(cursor.fetchone())
        else:
            return False
