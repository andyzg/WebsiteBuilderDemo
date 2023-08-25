import { useState } from "react";

function AddSection(props) {
  const { className = "" } = props;
  const classes = [
    `bg-blue-400 text-white rounded-sm cursor-pointer `,
    `flex justify-center`,
    `w-6 h-6`,
    `absolute left-1/2 -translate-x-1/2`,
     className
  ]

  return (
    <div className={classes.join(" ")}>
      +
    </div>
  );
}

function Toolbar(props) {
  const { editing } = props;

  if (!editing) {
    return null;
  }


  return (
    <div className={"opacity-0 group-hover:opacity-100 transition-opacity"}>
      <AddSection className="top-0" />
      <AddSection className="bottom-0" />
    </div>
  );
}

export default function Website(props) {
  const { mode, websiteData } = props;

  const editing = mode === "edit";
  const sections = [];

  for (let index = 0; index < websiteData.length; index += 1) {
    const section = websiteData[index];
    sections.push(
      <section key={index} className={"relative group"}>
        <Toolbar editing={editing} />
        <div className="p-8">
          {section.text}
        </div>
      </section>
    )
  }

  return sections
}
