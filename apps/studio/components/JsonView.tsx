import React from "react";
import { Card, Text, Stack, Button, Flex } from "@sanity/ui";
import { UserViewComponent } from "sanity/structure";
import { useClient } from "sanity";

export const EditableJsonView: UserViewComponent = ({ documentId }) => {
  const client = useClient({ apiVersion: "2026-02-20" });
  const [jsonString, setJsonString] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    client.fetch(`*[_id == $id][0]`, { id: documentId }).then((doc) => {
      if (doc) {
        setJsonString(JSON.stringify(doc, null, 2));
      }
    });
  }, [documentId, client]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonString(event.target.value);
    setError(null);
  };

  const handleSave = async () => {
    try {
      const newDoc = JSON.parse(jsonString);
      setIsSaving(true);
      await client.patch(documentId).set(newDoc).commit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card padding={4} height="fill">
      <Stack space={3}>
        <Text size={1} weight="semibold">
          Edit Raw JSON
        </Text>
        <textarea
          value={jsonString}
          onChange={handleChange}
          style={{
            fontFamily: "monospace",
            width: "100%",
            minHeight: "400px",
            padding: "8px",
            border: "1px solid #ccc",
          }}
        />
        {error && (
          <Text size={0} style={{ color: "#d1180b" }}>
            {error}
          </Text>
        )}
        <Flex gap={2}>
          <Button text="Save" tone="positive" onClick={handleSave} disabled={isSaving} />
        </Flex>
      </Stack>
    </Card>
  );
};
