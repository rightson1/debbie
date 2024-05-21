import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor, BubbleMenu, FloatingMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { IconColorPicker } from "@tabler/icons-react";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { editorColors } from "@/constants";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import { useEffect } from "react";
export default function Editor({
  initialText,
  setText,
}: {
  initialText?: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { colors } = useGlobalTheme();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Color,
      TextStyle,
    ],
    content: initialText || `<p>Start typing...</p>`,
  });
  useEffect(() => {
    if (editor?.getHTML()) {
      const updatedHTML = updateAnchorUrls(editor.getHTML());
      // const highlightedHTML = highlightCode(updatedHTML);
      // setText(highlightedHTML);
      setText(updatedHTML);
    }
  }, [editor?.getHTML()]);

  function updateAnchorUrls(htmlString: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Get all anchor elements
    const anchorElements = doc.querySelectorAll("a");

    // Loop through anchor elements and update their href attributes
    anchorElements.forEach((anchor) => {
      const href = anchor.getAttribute("href");
      if (href && !href.startsWith("http") && !href.startsWith("https")) {
        // Prepend 'https://' to relative URLs
        anchor.setAttribute("href", "https://" + href);
      }

      // Add target="_blank" to open links in a new tab
      anchor.setAttribute("target", "_blank");
    });

    // Serialize the updated document back to HTML
    return new XMLSerializer().serializeToString(doc);
  }
  // function highlightCode(htmlString: string) {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(htmlString, "text/html");

  //   // Get all code elements
  //   const codeElements = doc.querySelectorAll("code");

  //   // Loop through code elements and highlight the code
  //   codeElements.forEach((codeElement) => {
  //     const code = codeElement.textContent;
  //     const language = codeElement.getAttribute("data-language") || "plaintext";

  //     // Use highlight.js to highlight the code

  //     if (!code) return;

  //     const highlightedCode = hljs.highlight(language, code).value;

  //     // Replace the code element content with the highlighted code
  //     codeElement.innerHTML = highlightedCode;
  //   });

  //   // Serialize the updated document back to HTML
  //   return new XMLSerializer().serializeToString(doc);
  // }

  return (
    <Box
      sx={{
        "& .mantine-3eqw8l": {
          backgroundColor: `${colors.surface}`,
          border: "none",
        },
        "& .mantine-nlxhsk": {
          border: `1px solid ${colors.active} !important`,
          backgroundColor: `${colors.surface}`,
          borderBottom: "none",
        },
        "& .mantine-UnstyledButton-root": {
          backgroundColor: `${colors.surface} !important`,
          // border: `1px solid ${colors.active} !important`,
          border: "none",
          color: `${colors.text} !important`,
          fontWeight: "bold !important",
        },
        "& .mantine-1drwy5n": {
          backgroundColor: `${colors.surface} !important`,
          border: `1px solid ${colors.active} !important`,
          borderTopLeftRadius: "0px !important",
          borderTopRightRadius: "0px !important",
          color: `${colors.text} !important`,
          minHeight: "100px !important",
        },
        "& .mantine-1mlg4mb": {
          background: "none !important",
        },
        "& mantine-ColorSwatch-alphaOverlay": {
          background: "none !important",
        },
      }}
    >
      <RichTextEditor editor={editor} placeholder="Type something...">
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
            <RichTextEditor.H5 />
            <RichTextEditor.H6 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ColorPicker colors={editorColors} />
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Control interactive={false}>
              <IconColorPicker size="1rem" stroke={1.5} />
            </RichTextEditor.Control>
            <RichTextEditor.Color color="#F03E3E" />
            <RichTextEditor.Color color="#7048E8" />
            <RichTextEditor.Color color="#1098AD" />
            <RichTextEditor.Color color="#37B24D" />
            <RichTextEditor.Color color="#F59F00" />
            <RichTextEditor.Color color="#fff" />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.UnsetColor />
        </RichTextEditor.Toolbar>
        {editor && (
          <BubbleMenu editor={editor}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Link />
            </RichTextEditor.ControlsGroup>
          </BubbleMenu>
        )}
        {editor && (
          <FloatingMenu editor={editor}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.BulletList />
            </RichTextEditor.ControlsGroup>
          </FloatingMenu>
        )}
        <RichTextEditor.Content />
      </RichTextEditor>
    </Box>
  );
}
