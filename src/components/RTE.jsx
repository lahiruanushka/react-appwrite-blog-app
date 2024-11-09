import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export const RTE = ({ name, control, defaultValue = "" }) => {
  return (
    <Controller
      name={name || "content"}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <Editor
          apiKey={String(import.meta.env.VITE_TINYMCE_API_KEY)}
          initialValue={defaultValue}
          init={{
            height: 400,
            menubar: false,
            skin: document.documentElement.classList.contains("dark")
              ? "oxide-dark"
              : "oxide",
            content_css: document.documentElement.classList.contains("dark")
              ? "dark"
              : "default",
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px }",
            body_class: "prose max-w-none dark:prose-invert",
          }}
          onEditorChange={onChange}
        />
      )}
    />
  );
};
