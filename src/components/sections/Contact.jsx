import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
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
import { getLocalizedString } from '../../utils/i18nHelper';

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
          minHeight: { xs: 108, md: 92 },
          overflow: 'hidden',
          cursor: isClickable ? 'pointer' : 'default',
          position: 'relative',
          background: cardBackground,
          border: `1px solid ${isFeatured ? alpha(contact.color, 0.34) : 'rgba(15,37,55,0.12)'}`,
          borderRadius: 'var(--card-radius)',
          boxShadow: isFeatured
              ? `0 4px 16px ${alpha(contact.color, 0.16)}`
              : '0 8px 24px rgba(15,37,55,0.055)',
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
            p: { xs: 2.2, md: 2.15 },
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1.7, md: 1.8 },
          }}
        >
          {/* Icon */}
          <Box
            className="contact-icon"
            sx={{
              width: { xs: 48, md: 44 },
              height: { xs: 48, md: 44 },
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
                color: 'text.secondary',
                display: 'block',
                mb: 0.3,
                fontFamily: '"Fira Code", monospace',
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              {contact.label}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.primary',
                fontWeight: 600,
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
      color: '#B7791F',
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
      {/* Background orb */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          width: { xs: 260, md: 420 },
          height: { xs: 260, md: 420 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(21,157,179,0.2) 0%, transparent 70%)',
          bottom: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          filter: { xs: 'blur(28px)', md: 'blur(34px)' },
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth={false} sx={{ maxWidth: 1040, px: 'var(--section-inline-padding)', position: 'relative', zIndex: 1 }}>
        <SectionTitle
          overline={t('contact.overline')}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
        />

        {/* Main CTA block */}
        <AnimatedBox delay={0.1}>
          <Box
            sx={{
              textAlign: 'center',
              mb: { xs: 3, md: 2.5 },
              p: { xs: 2.5, md: 3 },
              borderRadius: 'var(--card-radius)',
              background: 'linear-gradient(135deg, rgba(11,92,171,0.1) 0%, rgba(21,157,179,0.1) 100%)',
              border: '1px solid rgba(11,92,171,0.22)',
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 1.25, fontSize: { xs: '1.45rem', md: '1.9rem' } }}
            >
              {t('contact.readyPrefix')}{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(90deg, #0B5CAB, #159DB3)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('contact.readyHighlight')}
              </Box>
            </Typography>

            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 540, mx: 'auto', lineHeight: 1.6 }}>
              {t('contact.body')}
            </Typography>
          </Box>
        </AnimatedBox>

        {/* Contact cards grid */}
        <Grid container spacing={{ xs: 1.6, md: 1.75 }}>
          {contacts.map((contact, index) => (
            <Grid item xs={12} sm={6} key={contact.label} sx={{ display: 'flex' }}>
              <ContactCard contact={contact} index={index} t={t} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
