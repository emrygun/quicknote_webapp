from flask import Flask, render_template, request, redirect
from flask_mysqldb import MySQL
from flask_cors import cross_origin, CORS

#Class dedicated for NoteApp applications database opearations
class NoteAppDbInstance:
    #Singleton instance
    __instance          = None

    #Some constants
    __cursorClass       = None
    __corsHeader        = None
    __databaseSettings  = None
    __app               = None

    #MySQL instances
    __mysql             = None
    __mysql_connection  = None
    __mysql_cursor      = None

    #Setters
    def setCursorClass(self, cursorClass):
        self.__cursorClass = cursorClass
        return self.__instance

    def setCorsHeader(self, corsHeader):
        self.__corsHeader = corsHeader
        return self.__instance

    def setDatabaseSettings(self, settings):
        self.__databaseSettings = settings
        return self.__instance

    def setApp(self, app):
        self.__app = app
        return self.__instance

    #Getters
    def getConnection(self):
        return self.__mysql_connection

    def getCursor(self):
        return self.__mysql_cursor

    def getMySQL(self):
        return self.__mysql

    #Connection commit
    def commit(self):
        self.__mysql_connection.commit()

    #Builder
    def build(self):
        #Check if initialized or not
        if(self.__databaseSettings == None or
           self.__app == None or
           self.__corsHeader == None or
           self.__cursorClass == None):
            print("error: Class not initialized.")

        else:
            CORS(self.__app)
            self.__app.config['CORS_HEADERS'] = self.__corsHeader

            #Initialize database configuration values
            self.__app.config['MYSQL_HOST']        = self.__databaseSettings.getHost()
            self.__app.config['MYSQL_PORT']        = self.__databaseSettings.getPort()
            self.__app.config['MYSQL_USER']        = self.__databaseSettings.getUser()
            self.__app.config['MYSQL_PASSWORD']    = self.__databaseSettings.getPassword()
            self.__app.config['MYSQL_DB']          = self.__databaseSettings.getDatabase()
            self.__app.config['MYSQL_CURSORCLASS'] = self.__cursorClass

            self.__mysql = MySQL(self.__app)
            return self

    #initialize mysql and connect to db
    def connectToDb(self):
        try:
            self.__mysql_connection = self.__mysql.connection
            self.__mysql_cursor = self.__mysql_connection.cursor()
        except Exception as e:
            print(e)
            print("error: Could not connect to database.")

    #Get Instance Methods
    @staticmethod
    def getInstance():
        if (NoteAppDbInstance.__instance == None):
            NoteAppDbInstance()
            return NoteAppDbInstance.__instance

    def __init__(self):
        """ Virtually private constructor. """
        if NoteAppDbInstance.__instance != None:
            raise Exception("This class is a singleton!")
        else:
            NoteAppDbInstance.__instance = self

