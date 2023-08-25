import { useState, useRef, useEffect, Fragment } from "react";

function AddSection(props) {
  const { className = "", onClick } = props;
  const classes = [
    `bg-blue-400 text-white rounded-sm cursor-pointer `,
    `flex justify-center`,
    `w-6 h-6`,
    `absolute left-1/2 -translate-x-1/2`,
     className
  ]

  return (
    <div onClick={onClick} className={classes.join(" ")}>
      +
    </div>
  );
}


function Toolbar(props) {
  const { editing, onAddSection } = props;

  if (!editing) {
    return null;
  }

  return (
    <div className={"opacity-0 group-hover:opacity-100 transition-opacity"}>
      <AddSection onClick={onAddSection.bind(this, 0)} className="top-0" />
      <AddSection onClick={onAddSection.bind(this, 1)} className="bottom-0" />
    </div>
  );
}

const Section = (props) => {
  const { sectionData, editing, onSectionTextChange, onAddSection } = props;
  const ref = useRef(null);

  useEffect(() => {
    ref.current.textContent = sectionData.text;
  }, [sectionData.text]);

  return (
    <section className={"relative group"}>
      <Toolbar editing={editing} onAddSection={onAddSection} />
      <div
        ref={ref}
        suppressContentEditableWarning="true"
        onInput={onSectionTextChange}
        contentEditable={editing}
        className="p-8"
      />
    </section>
  );
};

function Footer(props) {
  const { mode, onToggle } = props;

  const classes = [
    "fixed bottom-0 left-0 right-0",
    "h-16 p-4",
    "border-t-2 bg-white",
    "flex justify-between items-center",
  ]

  return (
    <footer className={classes.join(" ")}>
      {mode === "edit" ? (
        <div>Edit mode</div>
      ) : null}
      {mode === "read" ? (
        <div>Read-only mode</div>
      ) : null}

      <button onClick={onToggle} className="bg-slate-600 text-white text-sm rounded-md p-2">Toggle mode</button>
    </footer>
  );
}

export default function Website(props) {
  const { mode, setMode, websiteData, setWebsiteData } = props;

  const editing = mode === "edit";
  const sections = [];

  const onAddSection = (sectionIndex, offset) => {
    const newIndex = offset + sectionIndex;
    const newWebsiteData = [...websiteData];
    newWebsiteData.splice(newIndex, 0, { text: "Hello World" });
    setWebsiteData(newWebsiteData);
  };

  const onSectionTextChange = (sectionIndex, e) => {
    // Copy the immutable state
    const newWebsiteData = JSON.parse(JSON.stringify(websiteData));

    // Set the new value
    newWebsiteData[sectionIndex].text = e.target.innerText;
    setWebsiteData(newWebsiteData);
  }

  const onToggleMode = () => {
    if (mode === "edit") {
      setMode("read");
    } else {
      setMode("edit");
    }
  }

  for (let index = 0; index < websiteData.length; index += 1) {
    const sectionData = websiteData[index];
    sections.push(
      <Section key={index} sectionData={sectionData} onSectionTextChange={onSectionTextChange.bind(this, index)} onAddSection={onAddSection.bind(this, index)} editing={editing} />
    )
  }

  return (
    <Fragment>
      {sections}
      <Footer onToggle={onToggleMode} mode={mode} />
    </Fragment>
  );
}
