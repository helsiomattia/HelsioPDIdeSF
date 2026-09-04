import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Paper,
  Typography,
  alpha,
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import RouteRoundedIcon from '@mui/icons-material/RouteRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';
import { profile } from '../../data/profile';

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');
const siteUrl = 'https://helsiomattia.github.io/crm-specialist/';

function getHomePath() {
  return `${BASE_PATH || ''}/${window.location.search}`;
}

const metrics = [
  { value: 'React 18', label: 'Interface moderna e componentizada', icon: CodeRoundedIcon },
  { value: 'Vite 5', label: 'Build rápido para produção', icon: RocketLaunchRoundedIcon },
  { value: '3 idiomas', label: 'Português, inglês e espanhol', icon: LanguageRoundedIcon },
  { value: 'SPA', label: 'Rotas internas e fallback no GitHub Pages', icon: RouteRoundedIcon },
];

const featureCards = [
  {
    title: 'Vitrine profissional',
    description: 'Apresenta trajetória, experiência, credenciais, projetos e canais de contato em uma experiência única.',
    icon: WebRoundedIcon,
    color: '#0D4DA5',
  },
  {
    title: 'Conteúdo centralizado',
    description: 'As informações principais ficam em `src/data`, separadas da lógica visual e fáceis de manter.',
    icon: DataObjectRoundedIcon,
    color: '#0B8F61',
  },
  {
    title: 'Visual responsivo',
    description: 'Layout preparado para desktop, tablet e mobile, com cards, grids e navegação fluida.',
    icon: DevicesRoundedIcon,
    color: '#1EACB8',
  },
  {
    title: 'Deploy no GitHub Pages',
    description: 'Configuração com `base: /crm-specialist/` e fallback em `public/404.html` para rotas internas.',
    icon: StorageRoundedIcon,
    color: '#B7791F',
  },
];

const sections = [
  ['Início', 'Apresentação principal, cargo, papéis profissionais e chamadas para ação.'],
  ['Sobre', 'Bio profissional, pilares de valor, estatísticas e stack de atuação.'],
  ['Experiência', 'Linha do tempo com empresas, funções, períodos e principais entregas.'],
  ['Credenciais', 'Certificações Salesforce, formação acadêmica, bootcamps e conquistas.'],
  ['Expertise', 'Competências agrupadas por Salesforce, CRM, automação, dados, qualidade e métodos.'],
  ['Projetos', 'Cards para site externo, demos Salesforce e views HTML incorporadas.'],
  ['Contato', 'E-mail, telefone, localização, LinkedIn, GitHub e Trailblazer.'],
];

const dataFiles = [
  ['profile.js', 'Nome, título, contatos, redes, bio, estatísticas e stack principal.'],
  ['experience.js', 'Empresas, cargos, períodos, descrições, tecnologias e principais entregas.'],
  ['projects.js', 'Credenciais, certificações, formação, bootcamps e conquistas.'],
  ['skills.js', 'Áreas de expertise, habilidades e detalhes de cada competência.'],
  ['portfolioProjects.js', 'Projetos, links externos, demos internas e HTML incorporado.'],
  ['common.json', 'Textos fixos da interface em português, inglês e espanhol.'],
];

const stack = ['React 18', 'Vite 5', 'Material UI 5', 'Emotion', 'i18next', 'react-i18next', 'GSAP', 'GitHub Pages'];

const commands = ['npm install', 'npm run dev', 'npm run build', 'npm run preview'];

function AmbientBackground() {
  return (
    <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.34,
          backgroundImage: [
            'linear-gradient(rgba(13,77,165,0.12) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(13,77,165,0.12) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: { xs: '30px 30px', md: '44px 44px' },
          maskImage: 'linear-gradient(180deg, black 0%, transparent 72%)',
          WebkitMaskImage: 'linear-gradient(180deg, black 0%, transparent 72%)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 80, md: 120 },
          right: { xs: -190, md: -80 },
          width: { xs: 340, md: 560 },
          height: { xs: 340, md: 560 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30,172,184,0.24) 0%, transparent 68%)',
          filter: 'blur(34px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 520, md: 420 },
          left: { xs: -220, md: -100 },
          width: { xs: 360, md: 520 },
          height: { xs: 360, md: 520 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,77,165,0.2) 0%, transparent 70%)',
          filter: 'blur(42px)',
        }}
      />
    </Box>
  );
}

function TerminalCard() {
  return (
    <Paper
      elevation={0}
      sx={{
        overflow: 'hidden',
        borderRadius: { xs: '22px', md: '30px' },
        border: '1px solid rgba(13,77,165,0.18)',
        bgcolor: 'rgba(6,24,39,0.94)',
        color: '#EAF3F9',
        boxShadow: '0 30px 90px rgba(6,24,39,0.22)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, p: 1.5, borderBottom: '1px solid rgba(234,243,249,0.12)' }}>
        {['#D94A5F', '#F2A60D', '#29A366'].map((color) => (
          <Box key={color} sx={{ width: 11, height: 11, borderRadius: '50%', bgcolor: color }} />
        ))}
        <TerminalRoundedIcon sx={{ ml: 0.8, fontSize: '1rem', color: '#1EACB8' }} />
        <Typography sx={{ ml: 0.8, fontFamily: '"Fira Code", monospace', fontSize: '0.72rem', color: 'rgba(234,243,249,0.72)', fontWeight: 800 }}>
          portfolio/project-overview
        </Typography>
      </Box>

      <Box sx={{ p: { xs: 2.2, md: 3 } }}>
        <Typography sx={{ fontFamily: '"Fira Code", monospace', fontSize: { xs: '0.82rem', md: '0.9rem' }, lineHeight: 1.9 }}>
          <Box component="span" sx={{ color: '#1EACB8' }}>const</Box> project = {'{'}
          <br />
          &nbsp;&nbsp;owner: <Box component="span" sx={{ color: '#F2A60D' }}>'Helsio Mattia'</Box>,
          <br />
          &nbsp;&nbsp;focus: <Box component="span" sx={{ color: '#F2A60D' }}>'Salesforce CRM'</Box>,
          <br />
          &nbsp;&nbsp;sections: <Box component="span" sx={{ color: '#29A366' }}>7</Box>,
          <br />
          &nbsp;&nbsp;languages: [<Box component="span" sx={{ color: '#F2A60D' }}>'pt'</Box>, <Box component="span" sx={{ color: '#F2A60D' }}>'en'</Box>, <Box component="span" sx={{ color: '#F2A60D' }}>'es'</Box>],
          <br />
          &nbsp;&nbsp;deploy: <Box component="span" sx={{ color: '#F2A60D' }}>'GitHub Pages'</Box>
          <br />
          {'}'};
        </Typography>

        <Divider sx={{ my: 2.5, borderColor: 'rgba(234,243,249,0.14)' }} />

        <Box sx={{ display: 'grid', gap: 1 }}>
          {commands.map((command) => (
            <Typography key={command} sx={{ fontFamily: '"Fira Code", monospace', fontSize: '0.8rem', color: 'rgba(234,243,249,0.82)' }}>
              <Box component="span" sx={{ color: '#1EACB8' }}>$</Box> {command}
            </Typography>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}

function InfoCard({ title, description, icon: Icon, color }) {
  return (
    <Card
      sx={{
        height: '100%',
        p: { xs: 2.2, md: 2.6 },
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'rgba(255,255,255,0.78)',
        border: `1px solid ${alpha(color, 0.2)}`,
        boxShadow: `0 18px 50px ${alpha(color, 0.08)}`,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(145deg, ${alpha(color, 0.13)} 0%, transparent 54%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ width: 46, height: 46, borderRadius: '14px', display: 'grid', placeItems: 'center', bgcolor: alpha(color, 0.11), color, mb: 2 }}>
          <Icon />
        </Box>
        <Typography variant="h5" sx={{ fontSize: '1.08rem', fontWeight: 850, mb: 1, color: 'text.primary' }}>
          {title}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontWeight: 550, lineHeight: 1.7, fontSize: '0.92rem' }}>
          {description}
        </Typography>
      </Box>
    </Card>
  );
}

export default function AboutProjectPage() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100dvh',
        pt: 'calc(var(--header-height) + 28px)',
        pb: { xs: 6, md: 9 },
        background: 'linear-gradient(180deg, var(--site-bg-start) 0%, var(--site-bg-mid) 48%, var(--site-bg-end) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AmbientBackground />

      <Container maxWidth={false} sx={{ maxWidth: 'var(--page-max-width)', px: 'var(--section-inline-padding)', position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: { xs: 3, md: 5 } }}>
          <Button component="a" href={getHomePath()} startIcon={<ArrowBackRoundedIcon />} variant="outlined">
            Voltar ao portfólio
          </Button>
          <Button component="a" href={profile.github} target="_blank" rel="noopener noreferrer" endIcon={<GitHubIcon />}>
            Ver GitHub
          </Button>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.15fr) minmax(360px, 0.85fr)' },
            gap: { xs: 3, md: 5 },
            alignItems: 'center',
            mb: { xs: 5, md: 8 },
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              <Chip icon={<AutoAwesomeRoundedIcon />} label="Página oculta do projeto" color="primary" />
              <Chip label="React + Vite" variant="outlined" color="primary" />
              <Chip label="GitHub Pages" variant="outlined" color="secondary" />
            </Box>

            <Typography
              variant="h1"
              sx={{
                maxWidth: 920,
                fontSize: { xs: '2.55rem', sm: '3.6rem', md: '5rem' },
                lineHeight: 0.98,
                mb: 2,
                letterSpacing: '-0.06em',
              }}
            >
              Sobre o projeto que sustenta este portfólio
            </Typography>

            <Typography sx={{ maxWidth: 780, color: 'text.primary', fontSize: { xs: '1rem', md: '1.18rem' }, lineHeight: 1.75, fontWeight: 560, mb: 3 }}>
              Esta página apresenta a arquitetura, os recursos e as decisões por trás do portfólio profissional de Helsio Mattia. A ideia é mostrar não só o resultado visual, mas também como o projeto foi organizado para ser claro, escalável e fácil de manter.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
              <Button component="a" href={siteUrl} target="_blank" rel="noopener noreferrer" variant="contained" endIcon={<OpenInNewRoundedIcon />}>
                Abrir site publicado
              </Button>
              <Button component="a" href={`${profile.github}/crm-specialist`} target="_blank" rel="noopener noreferrer" variant="outlined" endIcon={<GitHubIcon />}>
                Repositório
              </Button>
            </Box>
          </Box>

          <TerminalCard />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' }, gap: 'var(--card-gap)', mb: { xs: 5, md: 8 } }}>
          {metrics.map(({ value, label, icon: Icon }) => (
            <Paper
              key={value}
              elevation={0}
              sx={{
                p: 2.4,
                borderRadius: '22px',
                bgcolor: 'rgba(255,255,255,0.72)',
                border: '1px solid rgba(13,77,165,0.13)',
                boxShadow: '0 16px 42px rgba(15,37,55,0.07)',
              }}
            >
              <Icon sx={{ color: 'primary.main', mb: 1.4 }} />
              <Typography variant="h4" sx={{ fontSize: '1.35rem', fontWeight: 900, mb: 0.5 }}>
                {value}
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.86rem', fontWeight: 650, lineHeight: 1.5 }}>
                {label}
              </Typography>
            </Paper>
          ))}
        </Box>

        <Box sx={{ mb: { xs: 5, md: 8 } }}>
          <Typography variant="overline" sx={{ color: 'primary.main' }}>
            principais recursos
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3.2rem' }, maxWidth: 760, mb: 3 }}>
            Uma vitrine profissional construída para ser bonita por fora e organizada por dentro.
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(4, minmax(0, 1fr))' }, gap: 'var(--card-gap)' }}>
            {featureCards.map((card) => (
              <InfoCard key={card.title} {...card} />
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '0.9fr 1.1fr' }, gap: { xs: 3, md: 4 }, mb: { xs: 5, md: 8 }, alignItems: 'stretch' }}>
          <Paper elevation={0} sx={{ p: { xs: 2.4, md: 3.2 }, borderRadius: '28px', bgcolor: 'rgba(255,255,255,0.78)', border: '1px solid rgba(13,77,165,0.14)' }}>
            <Typography variant="overline" sx={{ color: 'primary.main' }}>
              navegação
            </Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.35rem' }, mb: 1 }}>
              Seções do site
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontWeight: 560, lineHeight: 1.7, mb: 2.5 }}>
              A página principal foi pensada como uma narrativa profissional, começando pela proposta de valor e terminando com contato direto.
            </Typography>

            <Box sx={{ display: 'grid', gap: 1.1 }}>
              {sections.map(([title, description], index) => (
                <Box key={title} sx={{ display: 'grid', gridTemplateColumns: '42px 1fr', gap: 1.4, alignItems: 'start' }}>
                  <Box sx={{ width: 34, height: 34, borderRadius: '11px', display: 'grid', placeItems: 'center', bgcolor: alpha('#0D4DA5', 0.09), color: 'primary.main', fontFamily: '"Fira Code", monospace', fontWeight: 900, fontSize: '0.72rem' }}>
                    {String(index + 1).padStart(2, '0')}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 850, color: 'text.primary' }}>{title}</Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.88rem', lineHeight: 1.55 }}>{description}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>

          <Paper elevation={0} sx={{ p: { xs: 2.4, md: 3.2 }, borderRadius: '28px', bgcolor: 'rgba(6,24,39,0.95)', color: '#EAF3F9', border: '1px solid rgba(234,243,249,0.1)', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(30,172,184,0.22), transparent 38%)', pointerEvents: 'none' }} />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="overline" sx={{ color: '#1EACB8' }}>
                data layer
              </Typography>
              <Typography variant="h3" sx={{ color: '#fff', fontSize: { xs: '1.75rem', md: '2.35rem' }, mb: 1 }}>
                Conteúdo separado da interface
              </Typography>
              <Typography sx={{ color: 'rgba(234,243,249,0.72)', fontWeight: 560, lineHeight: 1.7, mb: 3 }}>
                O projeto evita espalhar informações profissionais pelos componentes. A manutenção principal acontece em poucos arquivos claros.
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.2 }}>
                {dataFiles.map(([file, description]) => (
                  <Box key={file} sx={{ p: 1.6, borderRadius: '16px', bgcolor: 'rgba(234,243,249,0.06)', border: '1px solid rgba(234,243,249,0.1)' }}>
                    <Typography sx={{ fontFamily: '"Fira Code", monospace', color: '#1EACB8', fontWeight: 850, fontSize: '0.82rem', mb: 0.8 }}>
                      src/data/{file}
                    </Typography>
                    <Typography sx={{ color: 'rgba(234,243,249,0.74)', lineHeight: 1.55, fontSize: '0.84rem', fontWeight: 540 }}>
                      {description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.05fr 0.95fr' }, gap: { xs: 3, md: 4 }, mb: { xs: 5, md: 8 } }}>
          <Paper elevation={0} sx={{ p: { xs: 2.4, md: 3.2 }, borderRadius: '28px', bgcolor: 'rgba(255,255,255,0.8)', border: '1px solid rgba(13,77,165,0.14)' }}>
            <Typography variant="overline" sx={{ color: 'primary.main' }}>
              stack utilizada
            </Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.35rem' }, mb: 2 }}>
              Tecnologias do projeto
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {stack.map((item) => (
                <Chip key={item} label={item} color={item.includes('GitHub') ? 'secondary' : 'primary'} variant={item.includes('React') || item.includes('Vite') ? 'filled' : 'outlined'} />
              ))}
            </Box>
            <Divider sx={{ my: 3 }} />
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.75, fontWeight: 560 }}>
              A stack foi escolhida para entregar velocidade de desenvolvimento, boa experiência visual, internacionalização simples e publicação estática compatível com GitHub Pages.
            </Typography>
          </Paper>

          <Paper elevation={0} sx={{ p: { xs: 2.4, md: 3.2 }, borderRadius: '28px', bgcolor: 'rgba(255,255,255,0.8)', border: '1px solid rgba(183,121,31,0.18)', boxShadow: '0 18px 48px rgba(183,121,31,0.08)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1 }}>
              <Box sx={{ width: 42, height: 42, borderRadius: '14px', display: 'grid', placeItems: 'center', bgcolor: alpha('#B7791F', 0.12), color: '#B7791F' }}>
                <VerifiedRoundedIcon />
              </Box>
              <Typography variant="h3" sx={{ fontSize: { xs: '1.55rem', md: '2rem' } }}>
                Deploy preparado
              </Typography>
            </Box>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.75, fontWeight: 560, mb: 2.4 }}>
              O site está configurado para o caminho `/crm-specialist/`, com redirecionamento para manter rotas internas funcionando mesmo quando abertas diretamente.
            </Typography>
            <Box sx={{ p: 1.8, borderRadius: '16px', bgcolor: alpha('#B7791F', 0.08), border: `1px solid ${alpha('#B7791F', 0.18)}` }}>
              <Typography sx={{ fontFamily: '"Fira Code", monospace', fontWeight: 850, color: '#B7791F', mb: 0.6 }}>
                vite.config.js
              </Typography>
              <Typography sx={{ fontFamily: '"Fira Code", monospace', fontSize: '0.84rem', color: 'text.primary' }}>
                base: '/crm-specialist/'
              </Typography>
            </Box>
          </Paper>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4.5 },
            borderRadius: { xs: '26px', md: '36px' },
            background: 'linear-gradient(135deg, #0D4DA5 0%, #1EACB8 100%)',
            color: '#fff',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Box sx={{ position: 'absolute', right: -80, top: -110, width: 280, height: 280, borderRadius: '50%', border: '42px solid rgba(255,255,255,0.08)' }} />
          <Box sx={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr auto' }, gap: 3, alignItems: 'center' }}>
            <Box>
              <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.78)' }}>
                resumo
              </Typography>
              <Typography variant="h2" sx={{ color: '#fff', fontSize: { xs: '2rem', md: '3.05rem' }, mb: 1 }}>
                Um projeto feito para apresentar valor profissional com clareza.
              </Typography>
              <Typography sx={{ maxWidth: 760, color: 'rgba(255,255,255,0.82)', lineHeight: 1.75, fontWeight: 560 }}>
                Mais do que uma página pessoal, este portfólio organiza narrativa, conteúdo, tecnologia e publicação para reforçar o posicionamento de Helsio Mattia em Salesforce CRM, automação e evolução operacional.
              </Typography>
            </Box>
            <Button component="a" href={getHomePath()} variant="contained" color="secondary" startIcon={<ArrowBackRoundedIcon />} sx={{ bgcolor: '#fff', color: '#0D4DA5', '&:hover': { bgcolor: 'rgba(255,255,255,0.92)' } }}>
              Voltar ao site
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
