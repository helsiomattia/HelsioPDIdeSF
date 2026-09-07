import { Box, Typography, alpha } from '@mui/material';
import { visualColors } from '../../theme/tokens';

export default function OperationalSignal({ signal, dense = false, sx }) {
  const color = signal?.color || visualColors.salesforceCore;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto minmax(0, 1fr)',
        alignItems: 'center',
        gap: dense ? 0.85 : 1.1,
        minWidth: 0,
        p: dense ? 1 : 1.25,
        borderRadius: dense ? '12px' : '14px',
        bgcolor: alpha(color, dense ? 0.075 : 0.095),
        border: `1px solid ${alpha(color, dense ? 0.16 : 0.22)}`,
        ...sx,
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          width: dense ? 9 : 11,
          height: dense ? 9 : 11,
          borderRadius: '50%',
          bgcolor: color,
          boxShadow: `0 0 0 ${dense ? 4 : 5}px ${alpha(color, 0.12)}`,
        }}
      />
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ color: 'text.primary', fontSize: dense ? '0.72rem' : '0.78rem', fontWeight: 800, lineHeight: 1.25 }}>
          {signal?.label}
        </Typography>
        {signal?.detail && (
          <Typography sx={{ color: 'text.secondary', fontSize: dense ? '0.66rem' : '0.72rem', fontWeight: 620, lineHeight: 1.35, mt: 0.2 }}>
            {signal.detail}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
