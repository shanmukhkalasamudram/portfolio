// Renders `text` with the first occurrence of `word` in italics, the accent
// style of the serif headings.
export default function Highlight({ text, word, className }) {
  const index = word ? text.indexOf(word) : -1;
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <em className={className}>{word}</em>
      {text.slice(index + word.length)}
    </>
  );
}
