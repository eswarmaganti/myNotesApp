import Notes from "../models/notesModel.js";
import asyncHandler from "express-async-handler";

export const getAllNotes = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const notesPinned = await Notes.find({ user: _id, isPinned: true });
  const notesOthers = await Notes.find({ user: _id, isPinned: false });
  if (notesPinned || notesOthers) {
    res.json({ notesOthers, notesPinned });
  } else {
    res.status(404);
    throw new Error("No Notes Found");
  }
});
export const getANotes = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await Notes.findById(id);
  if (note) {
    res.status(200).json(note);
  } else {
    res.json(404);
    throw new Error("No Notes found for given Id");
  }
});
export const updateNotes = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, categoury } = req.body;
  const updatedNote = await Notes.findByIdAndUpdate(id, {
    title,
    description,
    categoury,
  });

  if (updatedNote) {
    res.status(200).json(`Notes Updated Successfully`);
  } else {
    res.status(400);
    throw new Error("Error While Updating Notes");
  }
});
export const createNotes = asyncHandler(async (req, res) => {
  const { title, description, categoury } = req.body;
  const { _id } = req.user;

  const savedNotes = await Notes.create({
    user: _id,
    title,
    description,
    categoury,
  });
  if (savedNotes) {
    res.status(201).json(`Notes Created Successfully`);
  } else {
    res.status(400);
    throw new Error("Error while creating notes try again");
  }
});
export const deleteNotes = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedNote = await Notes.findByIdAndDelete(id);
  if (deletedNote) {
    res.status(200).json(deletedNote);
  } else {
    res.status(404);
    throw new Error("No Notes found for deletion");
  }
});

export const pinNotes = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notes = await Notes.findById({ _id: id });
  //update Notes
  if (notes) {
    const { isPinned, _id } = notes;

    const updatedNotes = await Notes.findByIdAndUpdate(
      { _id },
      { isPinned: !isPinned }
    );
    if (updateNotes) {
      res.status(200).json("Notes Updated Successfully!!");
    } else {
      res.status(500);
      throw new Error("Unable to update notes, please try again later!!");
    }
  } else {
    res.status(400);
    throw new Error("No Notes Found for given ID!!");
  }
});
