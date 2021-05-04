from utils import Content

class Note:
    def __init__(self, noteTitle, noteText, noteIsPublic, noteAuthor):
        self.noteTitle = noteTitle
        self.noteText = noteText
        self.noteIsPublic = noteIsPublic
        self.noteAuthor = noteAuthor

    #Constructor with content
    @classmethod
    def createWithJson(cls, content):
        #Check if content is not newNote JSON
        if Content.isNewNote(content):
            return cls( content.get("noteTitle"),
                        content.get("noteText"),
                        content.get("noteIsPublic"),
                        content.get("profile"))
        else:
            assert "Note: bad content"
            return False

