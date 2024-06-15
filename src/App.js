import React, { useEffect, useState } from "react";
import {
  EditorState,
  Modifier,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./App.module.css";
import EditorComp from "./Editor/EditorComp";
import { INLINE_STYLES } from "./utils/utility";

const App = () => {
  const { App: AppContainer, headerContainer } = styles;
  const [editorValue, setEditorValue] = useState(EditorState.createEmpty());

  const handleSave = () => {
    const content = editorValue.getCurrentContent();
    const rawContent = convertToRaw(content);
    localStorage.setItem("content", JSON.stringify(rawContent));
    toast("Content Saved");
  };

  useEffect(() => {
    const savedContent = localStorage.getItem("content");
    if (savedContent) {
      setEditorValue(
        EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent))),
      );
    }
  }, []);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorValue(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleBeforeInput = (chars, editorState) => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const blockKey = selection.getStartKey();
    const blockText = currentContent.getBlockForKey(blockKey).getText();

    const matchers = [
      { char: "#", offset: 1, blockType: "header-one" },
      { char: "*", offset: 1, blockType: INLINE_STYLES.BOLD },
      { char: "**", offset: 2, blockType: INLINE_STYLES.RED },
      { char: "***", offset: 3, blockType: INLINE_STYLES.UNDERLINE },
      { char: "```", offset: 3, blockType: INLINE_STYLES.CODE },
    ];

    const match = matchers.find((m) => chars === " " && blockText === m.char);
    if (match) {
      const newContentState = Modifier.setBlockType(
        Modifier.removeRange(
          currentContent,
          selection.merge({
            anchorOffset: 0,
            focusOffset: match.offset,
          }),
          "backward",
        ),
        selection,
        match.blockType,
      );
      setEditorValue(
        EditorState.push(editorState, newContentState, "change-block-type"),
      );
      return "handled";
    }
    return "not-handled";
  };

  const handleReturn = (e, editorState) => {
    const selection = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();

    const newContentState = Modifier.setBlockType(
      Modifier.splitBlock(currentContent, selection),
      editorState.getSelection(),
      "unstyled",
    );
    setEditorValue(
      EditorState.push(editorState, newContentState, "change-block-type"),
    );
    return "handled";
  };

  return (
    <div className={AppContainer}>
      <header className={headerContainer}>
        <h2>Demo Editor By Md Shagil Nizami</h2>
        <button onClick={handleSave}>Save</button>
      </header>
      <EditorComp
        editorValue={editorValue}
        setEditorValue={setEditorValue}
        handleKeyCommand={handleKeyCommand}
        handleBeforeInput={handleBeforeInput}
        handleReturn={handleReturn}
      />
    </div>
  );
};

export default App;
