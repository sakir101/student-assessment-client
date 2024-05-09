import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

import Quill from "quill";

var Font = Quill.import("formats/font");

Font.whitelist = [
  "Arial",
  "Helvetica",
  "Lato",
  "Montserrat",
  "Roboto",
  "Raleway",
  "Rubik",
];
Quill.register(Font, true);

const modules = {
  toolbar: [
    [
      { header: "1" },
      { header: "2" },
      { font: Font.whitelist },
      { size: ["small", false, "large", "huge"] },
    ],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ script: "sub" }, { script: "super" }],
    ["link", "code-block"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "bold",
  "font",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "indent",
  "script",
  "link",
  "color",
  "background",
  "align",
  "size",
];

// Add your custom fonts here
const fontOptions = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier New",
  "Verdana",
];

// Extend the toolbar with custom font options
(modules.toolbar[0][2] as any).options = fontOptions;

export { modules, formats };
