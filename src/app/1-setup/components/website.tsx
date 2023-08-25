import { Fragment } from "react";

type WebsiteProps = {
  mode: string;
  websiteData: any;
}

export default function Website(props: WebsiteProps) {
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
