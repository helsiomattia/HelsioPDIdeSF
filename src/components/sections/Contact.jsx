import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Container,
  IconButton,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../ui/SectionTitle';
import AnimatedBox from '../ui/AnimatedBox';
import { profile } from '../../data/profile';
import { visualColors, visualGradients } from '../../theme/tokens';
import { getLocalizedString } from '../../utils/i18nHelper';

function ContactAmbient() {
  const pulsePoints = [
    { left: { xs: '-44px', md: '-28px', lg: '1%' }, top: '22%', delay: '0s' },
    { right: { xs: '-44px', md: '-28px', lg: '1%' }, top: '18%', delay: '-1.6s' },
    { left: { md: '-36px', lg: '3%' }, bottom: '14%', delay: '-3.2s' },
    { right: { md: '-36px', lg: '3%' }, bottom: '12%', delay: '-4.8s' },
  ];

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {['left', 'right'].map((side) => (
        <Box
          key={side}
          component="svg"
          viewBox="0 0 900 420"
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            left: side === 'left' ? { md: '-650px', lg: '-590px', xl: '-500px' } : 'auto',
            right: side === 'right' ? { md: '-650px', lg: '-590px', xl: '-500px' } : 'auto',
            top: '50%',
            width: { md: 780, lg: 900 },
            transform: side === 'left' ? 'translateY(-50%)' : 'translateY(-50%) scaleX(-1)',
            opacity: { md: 0.28, xl: 0.38 },
            '& path': {
              fill: 'none',
              stroke: 'rgba(11,92,171,0.22)',
              strokeWidth: 1.5,
              strokeDasharray: '10 12',
              animation: 'contactRouteDash 12s linear infinite',
            },
            '& circle': {
              fill: 'rgba(255,255,255,0.62)',
              stroke: 'rgba(21,157,179,0.34)',
              strokeWidth: 1.4,
            },
          }}
        >
          <path d="M72 212 C210 72 330 312 450 176 S690 78 820 214" />
          <path d="M112 318 C256 242 348 382 502 288 S694 216 808 304" />
          <circle cx="72" cy="212" r="6" />
          <circle cx="282" cy="184" r="5" />
          <circle cx="450" cy="176" r="7" />
          <circle cx="642" cy="128" r="5" />
          <circle cx="820" cy="214" r="6" />
        </Box>
      ))}

      {pulsePoints.map((point, index) => (
        <Box
          key={`${point.left || point.right}-${point.top || point.bottom}`}
          sx={{
            display: { xs: index > 1 ? 'none' : 'block', md: 'block' },
            position: 'absolute',
            left: point.left,
            right: point.right,
            top: point.top,
            bottom: point.bottom,
            width: { xs: 86, md: 118 },
            height: { xs: 86, md: 118 },
            borderRadius: '50%',
            border: '1px solid rgba(21,157,179,0.26)',
            animation: `contactSignalPulse 5.8s ease-out ${point.delay} infinite`,
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: '31%',
              borderRadius: '50%',
              bgcolor: 'rgba(21,157,179,0.2)',
              boxShadow: '0 0 22px rgba(21,157,179,0.16)',
            },
          }}
        />
      ))}
    </Box>
  );
}

function ContactCard({ contact, index, t }) {
  const [copied, setCopied] = useState(false);
  const isExternal = contact.href && !contact.href.startsWith('mailto') && !contact.href.startsWith('tel');
  const isClickable = Boolean(contact.href);
  const isFeatured = index < 2;
  const cardBackground = isFeatured
    ? `linear-gradient(135deg, ${alpha(contact.color, 0.12)} 0%, rgba(224,236,245,0.94) 58%)`
    : 'rgba(224,236,245,0.9)';

  const openContact = () => {
    if (!contact.href) return;

    if (isExternal) {
      window.open(contact.href, '_blank', 'noopener,noreferrer');
      return;
    }

    window.location.href = contact.href;
  };

  const handleKeyDown = (event) => {
    if (!isClickable) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openContact();
    }
  };

  const handleCopy = (event) => {
    event.preventDefault();
    event.stopPropagation();

    navigator.clipboard.writeText(contact.value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <AnimatedBox
      delay={index * 0.08}
      style={{ width: '100%', height: '100%' }}
    >
      <Card
        sx={{
          p: 0,
          height: '100%',
          minHeight: { xs: 104, md: 86 },
          overflow: 'hidden',
          cursor: isClickable ? 'pointer' : 'default',
          position: 'relative',
          background: cardBackground,
          border: `1px solid ${isFeatured ? alpha(contact.color, 0.34) : 'rgba(15,37,55,0.12)'}`,
          borderRadius: 'var(--card-radius)',
          boxShadow: isFeatured
            ? `0 4px 16px ${alpha(contact.color, 0.14)}`
            : '0 8px 22px rgba(15,37,55,0.05)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          '@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))': {
            bgcolor: 'var(--site-surface)',
          },
          textDecoration: 'none',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, ${alpha(contact.color, 0.18)} 0%, transparent 52%)`,
            opacity: 0,
            transition: 'opacity 0.25s ease',
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 1,
            borderRadius: '17px',
            border: `1px solid ${alpha(contact.color, 0.16)}`,
            opacity: isFeatured ? 0.7 : 0,
            transition: 'opacity 0.25s ease',
            pointerEvents: 'none',
          },
          '&:hover': {
            transform: 'translateY(-2px)',
            borderColor: contact.color,
            boxShadow: isFeatured
              ? `0 7px 24px ${alpha(contact.color, 0.22)}`
              : `0 0 14px ${alpha(contact.color, 0.18)}`,
            bgcolor: 'var(--site-surface)',
          },
          '&:hover::before': {
            opacity: 1,
          },
          '&:hover::after': {
            opacity: 1,
          },
          '&:hover .contact-icon': {
            transform: 'scale(1.06)',
            bgcolor: alpha(contact.color, 0.16),
            borderColor: alpha(contact.color, 0.38),
            boxShadow: `0 10px 24px ${alpha(contact.color, 0.16)}`,
          },
          '&:hover .contact-action': {
            opacity: 1,
            transform: 'translate(2px, -2px)',
            color: contact.color,
          },
          '&:focus-visible': {
            outline: `3px solid ${alpha(contact.color, 0.24)}`,
            outlineOffset: 3,
            borderColor: alpha(contact.color, 0.42),
          },
        }}
        component="div"
        onClick={isClickable ? openContact : undefined}
        onKeyDown={handleKeyDown}
        role={isClickable ? 'link' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        aria-label={isClickable ? `${contact.label}: ${contact.value}` : undefined}
      >
        <CardContent
          sx={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            p: { xs: 2, md: 1.8 },
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1.55, md: 1.55 },
          }}
        >
          {/* Icon */}
          <Box
            className="contact-icon"
            sx={{
              width: { xs: 46, md: 42 },
              height: { xs: 46, md: 42 },
              borderRadius: '12px',
              bgcolor: alpha(contact.color, 0.12),
              border: `1.5px solid ${alpha(contact.color, 0.3)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: contact.color,
              flexShrink: 0,
              transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {contact.icon}
          </Box>

          {/* Text */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.primary',
                display: 'block',
                mb: 0.3,
                fontFamily: '"Fira Code", monospace',
                fontSize: '0.68rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 800,
              }}
            >
              {contact.label}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.primary',
                fontWeight: 750,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {contact.value}
            </Typography>
          </Box>

          {/* Action area */}
          <Box sx={{ flexShrink: 0 }}>
            {contact.copyable ? (
              <Tooltip title={copied ? t('contact.copied') : t('contact.copy')} arrow>
                <IconButton
                  className="contact-action"
                  size="small"
                  onClick={handleCopy}
                  aria-label={t('contact.copyEmail')}
                  sx={{
                    color: copied ? 'success.main' : 'text.secondary',
                    bgcolor: copied ? alpha('#0B8F61', 0.12) : alpha(contact.color, 0.08),
                    border: `1px solid ${copied ? alpha('#0B8F61', 0.28) : alpha(contact.color, 0.14)}`,
                    opacity: copied ? 1 : 0.78,
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      color: contact.color,
                      bgcolor: alpha(contact.color, 0.14),
                    },
                    '&:focus-visible': {
                      outline: `2px solid ${alpha(contact.color, 0.35)}`,
                      outlineOffset: 2,
                    },
                  }}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            ) : contact.href ? (
              <ArrowOutwardIcon
                className="contact-action"
                sx={{
                  fontSize: '1.1rem',
                  color: 'text.secondary',
                  opacity: 0.55,
                  transition: 'all 0.25s ease',
                }}
              />
            ) : null}
          </Box>
        </CardContent>
      </Card>
    </AnimatedBox>
  );
}

export default function Contact() {
  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage || 'pt';
  const contacts = [
    {
      icon: <EmailOutlinedIcon sx={{ fontSize: '1.5rem' }} />,
      label: t('contact.labels.email'),
      value: profile.email,
      href: `mailto:${profile.email}`,
      copyable: true,
      color: '#D94A5F',
    },
    {
      icon: <LinkedInIcon sx={{ fontSize: '1.5rem' }} />,
      label: 'LinkedIn',
      value: profile.linkedinDisplay,
      href: profile.linkedin,
      copyable: false,
      color: '#0A66C2',
    },
    {
      icon: <GitHubIcon sx={{ fontSize: '1.5rem' }} />,
      label: 'GitHub',
      value: profile.githubDisplay,
      href: profile.github,
      copyable: false,
      color: '#4A6478',
    },
    {
      icon: <WorkspacePremiumOutlinedIcon sx={{ fontSize: '1.5rem' }} />,
      label: 'Trailblazer',
      value: profile.trailblazerDisplay,
      href: profile.trailblazer,
      copyable: false,
      color: '#0B78B6',
    },
    {
      icon: <PhoneOutlinedIcon sx={{ fontSize: '1.5rem' }} />,
      label: t('contact.labels.phone'),
      value: profile.phone,
      href: `tel:+${profile.phone.replace(/\D/g, '')}`,
      copyable: false,
      color: '#0B8F61',
    },
    {
      icon: <PlaceOutlinedIcon sx={{ fontSize: '1.5rem' }} />,
      label: t('contact.labels.location'),
      value: getLocalizedString(profile.location, lang),
      href: null,
      copyable: false,
      color: visualColors.signalAmber,
    },
  ];

  return (
    <Box
      id="contact"
      data-section="contact"
      component="section"
      sx={{
        minHeight: { md: 'calc(100dvh - var(--header-height))' },
        display: 'flex',
        alignItems: 'center',
        py: { xs: 6, md: 'var(--section-block-padding)' },
        background: 'linear-gradient(180deg, var(--site-bg-mid) 0%, var(--site-bg-end) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <ContactAmbient />

      <Container maxWidth={false} sx={{ maxWidth: 1160, px: 'var(--section-inline-padding)', position: 'relative', zIndex: 1 }}>
        <SectionTitle
          overline={t('contact.overline')}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
          align="center"
        />

        {/* Main CTA block */}
        <AnimatedBox delay={0.1}>
          <Box
            sx={{
              textAlign: 'center',
              mb: { xs: 2.5, md: 1.8 },
              p: { xs: 2.35, md: 2.25 },
              borderRadius: 'var(--card-radius)',
              background: 'linear-gradient(135deg, rgba(11,92,171,0.1) 0%, rgba(21,157,179,0.1) 100%)',
              border: '1px solid rgba(11,92,171,0.22)',
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 750, mb: 0.9, fontSize: { xs: '1.45rem', md: '1.75rem' }, lineHeight: 1.22 }}
            >
              {t('contact.readyPrefix')}{' '}
              <Box
                component="span"
                sx={{
                  background: visualGradients.crmFlow,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('contact.readyHighlight')}
              </Box>
            </Typography>

            <Typography variant="body1" sx={{ color: 'text.primary', maxWidth: 620, mx: 'auto', lineHeight: 1.52, fontWeight: 500, fontSize: { xs: '0.96rem', md: '1rem' } }}>
              {t('contact.body')}
            </Typography>
          </Box>
        </AnimatedBox>

        {/* Contact cards grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
            gap: { xs: 1.5, md: 1.45 },
            alignItems: 'stretch',
          }}
        >
          {contacts.map((contact, index) => (
            <Box key={contact.label} sx={{ display: 'flex' }}>
              <ContactCard contact={contact} index={index} t={t} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
