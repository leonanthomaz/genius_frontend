// src/pages/FaqPage.tsx

import { useState } from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Importe o AddIcon

const FaqComponent = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    console.log(event)
    setExpanded(isExpanded ? panel : false);
  };
  

  const faqs = [
    {
      question: 'Quais tipos de serviços de IA vocês oferecem?',
      answer: 'Oferecemos uma variedade de serviços de IA, incluindo desenvolvimento de chatbots, análise de dados, automação de processos e consultoria em IA.',
    },
    {
      question: 'Como funciona o processo de desenvolvimento de um chatbot?',
      answer: 'Nosso processo envolve a coleta de requisitos, design da conversa, desenvolvimento, testes e implementação. Oferecemos suporte contínuo após a implementação.',
    },
    {
      question: 'Vocês oferecem suporte após a implementação dos serviços?',
      answer: 'Sim, oferecemos suporte contínuo para garantir que nossos clientes obtenham o máximo valor de nossos serviços de IA.',
    },
    {
      question: 'Quais tecnologias vocês utilizam?',
      answer: 'Utilizamos uma variedade de tecnologias de IA, incluindo machine learning, processamento de linguagem natural e visão computacional.',
    },
    {
      question: 'Como posso solicitar um orçamento?',
      answer: 'Você pode solicitar um orçamento entrando em contato conosco através do formulário de contato em nosso site ou enviando um e-mail para contato@suaempresa.com.',
    },
  ];

  const AccordionStyled = styled(Accordion)`
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `;

  const AccordionSummaryStyled = styled(AccordionSummary)`
    background: linear-gradient(135deg, #c9edf7 30%, #6beeff 50%);
    padding: 16px;
    border-bottom: 1px solid #ddd;
    &.Mui-expanded {
      background-color: #e0e0e0;
    }
  `;

  const AccordionDetailsStyled = styled(AccordionDetails)`
    background-color: #f9f9f9;
    padding: 16px;
  `;
  

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Perguntas Frequentes
      </Typography>
      {faqs.map((faq, index) => (
        <AccordionStyled expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} key={index}>
          <AccordionSummaryStyled expandIcon={<AddIcon />}>
            <Typography>{faq.question}</Typography>
          </AccordionSummaryStyled>
          <AccordionDetailsStyled>
            <Typography>{faq.answer}</Typography>
          </AccordionDetailsStyled>
        </AccordionStyled>
      ))}
    </Container>
  );
};

export default FaqComponent;