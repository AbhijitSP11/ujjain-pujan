/** Renders one or more JSON-LD blocks into the document. */
export default function JsonLd({ schema }: { schema: object | object[] }) {
  const blocks = Array.isArray(schema) ? schema : [schema]
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  )
}
