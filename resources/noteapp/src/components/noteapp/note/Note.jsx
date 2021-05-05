import React, { useState, useEffect, useCallback } from "react";

import "./note.scss";

export const UserNote = ({Note, deleteUserNote,showDisplayNoteModal, switchDisplayNoteModal}) => {
    //Delete Note
    const deleteNote = () => deleteUserNote(Note);
    //Open note
    const displayNote = () => switchDisplayNoteModal(Note);

  return (
    <li>
      <div className="field has-addons user-note">
        <div className="control title-block">
          <p className="button is-small is-full-width" onClick={displayNote} type="text">
            {Note.title}
          </p>
        </div>
        <div className="control edit-block">
          <p className="button is-small fa fa-edit"></p>
        </div>
        <div className="control delete-block" onClick={deleteNote}>
          <p className="button is-small fa fa-trash-o"></p>
        </div>
      </div>
    </li>
  );
}

export const DisplayNote = ({ showDisplayNoteModal, switchDisplayNoteModal, editNote, Note})=> {
    const [content, setContent] = useState(null);
    const closeDisplayNote = () => {
        switchDisplayNoteModal(null);
        setContent(null)
    }
    const submitEditedNote = () => editNote(Note.noteId, content);

    //Get Note changes on same instance
    useEffect(() => {
        setContent(Note)
    }, [Note])

    return showDisplayNoteModal ?
        (
          <div className="displayNote-main-container">
            <article class="displayNote-container message is-white">
              <div class="displayNote-modal-header message-header">
                <div className="displayNote-modal-titleField">
                  <div className="title is-4">{Note.title}</div>
                  <div className="date subtitle is-7">Date: {Note.date}</div>
                  <div className="token subtitle is-7">Token: {Note.noteId}</div>
                  <div className="isPublic subtitle is-7">Public: {(Note.isPublic === 1 ? 
                                <i class="fa fa-check" aria-hidden="true"/> : 
                                <i class="fa fa-times" aria-hidden="true"/>)}</div>
                </div>
                <button className="displayNote-closeButton"
                  class="delete"
                  aria-label="delete"
                  onClick={closeDisplayNote}
                />
              </div>
              <textarea
                className="displayNote-textarea textarea has-fixed-size is-small"
                placeholder="Write your note here. 500 word max."
                value={content != null ? content.text : null}
                onChange={event => setContent(event.target.value)}
                name="noteText"
              />
              <button className="editNoteButton button is-small" onClick={submitEditedNote}>
                Submit Changes
              </button>
            </article>
          </div>
        ) : null;
}

export const CreateNote = ({ showCreateNoteModal, switchCreateNoteModal, Profile, }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [noteIsPublic, setNoteIsPublic] = useState(false);

  const closeCreateNoteModal = () => {
    switchCreateNoteModal();
    setNoteText("");
    setNoteTitle("");
    setNoteIsPublic(false);
  };

  const submitNote = () => {
    const regExp = /[a-zA-Z]/g;

    let newNote = {
        profile: Profile.googleId,
        noteTitle: noteTitle,
        noteText: noteText,
        noteIsPublic: noteIsPublic,
    }

    let requestOptions = {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        mode: "no-cors",
        body: JSON.stringify(newNote)
    };

    console.log(JSON.stringify(newNote));
    fetch('http://localhost:5000/insertNote', requestOptions)
    .then(response => response.json())
    closeCreateNoteModal();
  };

  return showCreateNoteModal ? (
    <div className="createNote-main-container">
      <div className="createNote-container">
        <article className="createNote-modal message is-white">
          <div className="createNote-modal-header">
            <p className="title is-5">Create Note</p>
            <button
              className="delete"
              aria-label="delete"
              onClick={closeCreateNoteModal}
            />
          </div>
          <div className="createNote-modal-titleField field">
            <label className="label title is-5">
              Note Title:
              <input
                className="title-input subtitle is-5"
                type="text"
                placeholder="Text input"
                name="noteTitle"
                onChange={(event) => setNoteTitle(event.target.value)}
              />
            </label>
          </div>
          <div className="createNote-modal-noteField field">
            <textarea
              className="textarea has-fixed-size is-small"
              placeholder="Write your note here. 500 word max."
              name="noteText"
              onChange={(event) => setNoteText(event.target.value)}
            />
          </div>
          <div className="createNote-modal-noteSubmit field">
            <label className="createNote-modal-noteSubmit-public checkbox">
              <input
                type="checkbox"
                name="noteIsPublic"
                onChange={(event) => setNoteIsPublic(event.target.checked)}
              />
              <p className="subtitle is-6">Public</p>
            </label>
            <div className="createNote-button-submit">
              <button className="button is-small" onClick={submitNote}>
                Submit
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  ) : null;
};
