import React, { useState, useRef, useEffect } from "react";

type AddSectionProps = {
  className?: string;
  onClick: () => void;
};

function AddSection(props: AddSectionProps) {
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

type ToolbarProps = {
  editing: boolean;
  onAddSection: (index: number) => void;
};

const Toolbar: React.FunctionComponent<ToolbarProps> = (props) => {
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

type SectionProps = {
  sectionData: any;
  editing: boolean;
  onSectionTextChange: (event: any) => void;
  onAddSection: (index: number) => void;
};

function Section(props: SectionProps) {
  const { sectionData, editing, onSectionTextChange, onAddSection } = props;
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = sectionData.text;
    }
  }, [sectionData.text]);

  return (
    <section className={"relative group"}>
      <Toolbar editing={editing} onAddSection={onAddSection} />
      <div
        ref={ref}
        suppressContentEditableWarning={true}
        onInput={onSectionTextChange}
        contentEditable={editing}
        className="p-8"
      />
    </section>
  );
};

type WebsiteProps = {
  mode: string;
  websiteData: any;
  setWebsiteData: (data: any) => void;
}

const Website: React.FunctionComponent<WebsiteProps> = props => {
  const { mode, websiteData, setWebsiteData } = props;

  const editing = mode === "edit";
  const sections = [];

  const onAddSection = (sectionIndex: number, offset: number) => {
    const newIndex = offset + sectionIndex;
    const newWebsiteData = [...websiteData];
    newWebsiteData.splice(newIndex, 0, { text: "Hello World" });
    setWebsiteData(newWebsiteData);
  };

  const onSectionTextChange = (sectionIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    // Copy the immutable state
    const newWebsiteData = JSON.parse(JSON.stringify(websiteData));

    // Set the new value
    newWebsiteData[sectionIndex].text = e.target.innerText;
    setWebsiteData(newWebsiteData);
  }

  for (let index = 0; index < websiteData.length; index += 1) {
    const sectionData = websiteData[index];
    sections.push(
      <Section key={index} sectionData={sectionData} onSectionTextChange={onSectionTextChange.bind(this, index)} onAddSection={onAddSection.bind(this, index)} editing={editing} />
    )
  }

  return sections;
}
export default Website;
