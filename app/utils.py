from flask_mysqldb import MySQL
from flask_cors import CORS

import yaml

#An util class to check contents of content objects
class Content:
    @staticmethod
    def isNewNote(content):
        if {"noteTitle", "noteText", "noteIsPublic", "profile"} <= content.keys():
            return True
        else:
            return False

    @staticmethod
    def isGoogleProfile(content):
        if {"googleId", "imageUrl", "email", "name", "givenName", "familyName"} <= content.keys():
            return True
        else:
            return False

    @staticmethod
    def isNoteRequest(content):
        if {"googleId", "token"} <= content.keys():
            return True
        else:
            return False

#A class dedicated to get elements from "database.yaml" and adjust
class DatabaseYamlParser:
    #Private Constans
    __databaseName  = None
    __Host          = None
    __Port          = None
    __Username      = None
    __Password      = None
    __Database      = None

    def __init__(self, databaseName):
        self.__databaseName = databaseName
        databaseMessage = "DATABASE: " + self. __databaseName + "\n"
        #Open "database.yaml" file to get database variables

        #Database variables are stored in "db/noteAppDb/database.yaml" which
        #you need to create
        with open(r'../db/noteAppDb/database.yaml') as database_yaml:
            documents = yaml.full_load(database_yaml)

            #Print database variables
            for item, doc in documents.items():
                print(item, ":", doc)

        #Initialize database configuration values
        self.__Host     = documents.get(self.__databaseName).get('host')
        self.__Port     = documents.get(self.__databaseName).get('port')
        self.__Username = documents.get(self.__databaseName).get('username')
        self.__Password = documents.get(self.__databaseName).get('password')
        self.__Database = documents.get(self.__databaseName).get('database')

        #Print initialized message
        print(databaseMessage)

    #Getters
    def getHost(self):
        return self.__Host

    def getPort(self):
        return self.__Port

    def getUser(self):
        return self.__Username

    def getPassword(self):
        return self.__Password

    def getDatabase(self):
        return self.__Database

