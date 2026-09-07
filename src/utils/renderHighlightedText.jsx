import { Box } from '@mui/material';

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function renderHighlightedText(text, terms, color) {
  if (!text || !terms?.length) return text;

  const activeTerms = [...terms].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${activeTerms.map(escapeRegExp).join('|')})`, 'gi');
  const normalizedTerms = new Set(activeTerms.map((term) => term.toLocaleLowerCase()));

  return text.split(pattern).map((part, index) => {
    if (!part) return null;

    const isStrong = normalizedTerms.has(part.toLocaleLowerCase());

    if (!isStrong) return part;

    return (
      <Box
        key={`${part}-${index}`}
        component="strong"
        sx={{ color, fontWeight: 850 }}
      >
        {part}
      </Box>
    );
  });
}
