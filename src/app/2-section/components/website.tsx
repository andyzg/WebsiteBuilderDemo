import { useState } from "react";

type AddSectionProps = {
  className?: string;
};

function AddSection(props: AddSectionProps) {
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

type ToolbarProps = {
  editing: boolean;
};

const Toolbar: React.FunctionComponent<ToolbarProps> = (props) => {
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

type WebsiteProps = {
  mode: string;
  websiteData: any;
}

export default function Website(props: WebsiteProps) {
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
