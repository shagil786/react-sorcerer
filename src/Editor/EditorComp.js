import React, { useRef } from "react";
import styles from "./Editor.module.css";
import { DefaultDraftBlockRenderMap, Editor } from "draft-js";
import "draft-js/dist/Draft.css";
import { blockRenderMap, blockStyleFn } from "../utils/utility";

const EditorComp = ({editorValue, setEditorValue, handleBeforeInput, handleKeyCommand, handleReturn}) => {
  const { conatiner } = styles;
  const myRef = useRef(null);

  return (
    <div className={conatiner}>
      <Editor
        editorState={editorValue}
        onChange={setEditorValue}
        ref={myRef}
        handleKeyCommand={handleKeyCommand}
        handleBeforeInput={handleBeforeInput}
        handleReturn={handleReturn}
        blockRenderMap={DefaultDraftBlockRenderMap.merge(blockRenderMap)}
        placeholder="your own editor, type anything and see the magic..."
        blockStyleFn={blockStyleFn}
      />
    </div>
  );
};

export default EditorComp;
