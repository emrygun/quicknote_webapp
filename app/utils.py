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


