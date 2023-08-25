import { Fragment } from "react";

export default function Website(props) {
  const { mode, websiteData } = props;

  const sections = [];

  for (const section of websiteData) {
    sections.push(
      <section className={"p-8"}>
        {section.text}
      </section>
    )
  }

  return sections
}
