// components/GroupPicker.tsx
import { useCallback, useEffect, useState } from "react";
import { set, unset, useClient, type StringInputProps, type StringSchemaType } from "sanity";
import { Select, Stack, Spinner, Text, Box } from "@sanity/ui";
interface Group {
  name: Array<{ _key: string; value: string }>;
  slug: string;
  subgroups?: Array<{
    name: Array<{ _key: string; value: string }>;
    slug: string;
  }>;
}

export function GroupPicker({ value = "", onChange, path }: StringInputProps<StringSchemaType>) {
  const client = useClient({ apiVersion: "2026-02-20" });
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    client
      .fetch(`
      *[_id == "personGroups"][0]{
        groups[]{
          name,
          "slug": slug.current,
          subgroups[]{
            name,
            "slug": slug.current
          }
        }
      }
      `)
      .then((doc) => {
        setGroups(doc?.groups || []);
      })
      .catch((err) => {
        console.error("Failed to fetch groups:", err);
        setGroups([]);
      })
      .finally(() => setLoading(false));
  }, [client]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      onChange(value ? set(value) : unset());
    },
    [onChange]
  );

  if (loading) {
    return (
      <Box padding={3}>
        <Stack space={2}>
          <Spinner />
          <Text size={1}>Ładowanie grup...</Text>
        </Stack>
      </Box>
    );
  }
  return (
    <Select value={value} onChange={handleChange} disabled={groups.length === 0}>
      <option value="" disabled>
        — Wybierz grupę —
      </option>
      {groups.map((group) =>
        group.subgroups && group.subgroups.length > 0 ? (
          <optgroup key={group.slug} label={group.name[0]?.value || group.slug}>
            {group.subgroups.map((subgroup) => (
              <option key={subgroup.slug} value={subgroup.slug}>
                {subgroup.name[0]?.value || subgroup.slug}
              </option>
            ))}
          </optgroup>
        ) : (
          <option key={group.slug} value={group.slug}>
            {group.name[0]?.value || group.slug}
          </option>
        )
      )}
    </Select>
  );
}
