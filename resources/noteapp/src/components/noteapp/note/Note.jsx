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

export const DisplayNote = ({ showDisplayNoteModal, switchDisplayNoteModal, Note})=> {
    const closeDisplayNote = () => switchDisplayNoteModal(null);

    return showDisplayNoteModal ? (
      <article class="message is-white">
        <div class="message-header">
          <p>{Note.title}</p>
          <p className="subtitle is-6">11 01 1999</p>
          <button
            class="delete"
            aria-label="delete"
            onClick={closeDisplayNote}
          />
        </div>
        <textarea
          className="textarea has-fixed-size is-small"
          placeholder="Write your note here. 500 word max."
          value={Note.text}
          name="noteText"
        />
      </article>
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
      <div
        className="createNote-container"
        showCreateNoteModal={showCreateNoteModal}
      >
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