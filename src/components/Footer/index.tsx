// src/components/Footer.tsx

import { Box, Typography, Link, Container, Grid, styled } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const FooterContainer = styled(Box)<{ component?: React.ElementType }>`
  background: linear-gradient(135deg, #c9edf7 30%, #6beeff 50%);
  padding: 40px 0;
`;

const SocialIcons = styled(Box)`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
`;

const Footer = () => {
  return (
    <FooterContainer component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contato
            </Typography>
            <Typography variant="body2">
              Endereço: Rua Exemplo, 123 - São Paulo, SP
              <br />
              Telefone: (11) 1234-5678
              <br />
              E-mail: contato@suaempresa.com
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Links Úteis
            </Typography>
            <Box>
              <Link href="/" color="inherit" display="block">
                Página Inicial
              </Link>
              <Link href="/servicos" color="inherit" display="block">
                Serviços
              </Link>
              <Link href="/contato" color="inherit" display="block">
                Contato
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Redes Sociais
            </Typography>
            <SocialIcons>
              <Link href="#" color="inherit">
                <FacebookIcon />
              </Link>
              <Link href="#" color="inherit">
                <TwitterIcon />
              </Link>
              <Link href="#" color="inherit">
                <InstagramIcon />
              </Link>
            </SocialIcons>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ mt: 4 }}>
          © {new Date().getFullYear()} Sua Empresa. Todos os direitos reservados.
        </Typography>
      </Container>
    </FooterContainer>
  );
};

export default Footer;