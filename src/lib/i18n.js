import { DAYS, PHASES, SKILL_CONTEXT } from "./originalPlan.js";

const UI_TEXT = {
  pt: {
    localeLabel: "PT-BR",
    brand: "Expedição Roblox · Comunicação",
    eyebrow: "Expedição Roblox 2026",
    title: "Plano de Comunicação Digital",
    phasePrefix: "Semana",
    weeks: "Semanas",
    chooseAction: "Escolher ação",
    communityPulse: "Pulso da comunidade",
    noteSubtitle: "Registre o que aconteceu nesta semana.",
    notePlaceholder: "Novos membros, engajamento no Discord, projetos enviados, o que funcionou ou não…",
    saveNote: "Salvar nota",
    saved: "Salvo",
    objective: "Objetivo",
    competencies: "Competências",
    reach: "Alcance",
    socialFeed: "Feed social",
    production: "Produção",
    primaryAudience: "Público principal",
    script: "Roteiro",
    publicationCaption: "Publicação · Legenda",
    readyToPublish: "Pronto para publicar",
    copyCaption: "Copiar legenda",
    copyMessage: "Copiar mensagem",
    copied: "Copiado",
    discord: "Discord",
    server: "Servidor",
    messageForServer: "Mensagem para o servidor",
    readyToPost: "Pronto para postar",
    caution: "Cuidados para esta ação",
    attention: "Atenção",
    skills: "Competências",
    status: "Status",
    change: "Trocar",
    remove: "Remover",
    planned: "Planejado",
    published: "Publicado",
    skipped: "Pulado",
    recommended: "Recomendada",
    outOfPhase: "Fora de fase",
    lastWeek: "↩ Semana passada",
    weeksAgo: (count) => `Há ${count} semanas`,
    weekLabel: (week) => `Semana ${week}`,
    weekKick: (week) => `Semana ${week}`,
    phaseKick: (week, theme, phase) => `Semana ${week} · ${theme} · ${phase}`,
    noteIndicator: "✎ nota",
  },
  en: {
    localeLabel: "EN",
    brand: "Expedição Roblox · Communication",
    eyebrow: "Expedição Roblox 2026",
    title: "Digital Communication Plan",
    phasePrefix: "Week",
    weeks: "Weeks",
    chooseAction: "Choose action",
    communityPulse: "Community pulse",
    noteSubtitle: "Record what happened this week.",
    notePlaceholder: "New members, Discord engagement, projects submitted, what worked or not…",
    saveNote: "Save note",
    saved: "Saved",
    objective: "Objective",
    competencies: "Skills",
    reach: "Reach",
    socialFeed: "Social feed",
    production: "Production",
    primaryAudience: "Primary audience",
    script: "Script",
    publicationCaption: "Publication · Caption",
    readyToPublish: "Ready to publish",
    copyCaption: "Copy caption",
    copyMessage: "Copy message",
    copied: "Copied",
    discord: "Discord",
    server: "Server",
    messageForServer: "Message for the server",
    readyToPost: "Ready to post",
    caution: "Caution for this action",
    attention: "Attention",
    skills: "Skills",
    status: "Status",
    change: "Change",
    remove: "Remove",
    planned: "Planned",
    published: "Published",
    skipped: "Skipped",
    recommended: "Recommended",
    outOfPhase: "Out of phase",
    lastWeek: "↩ Last week",
    weeksAgo: (count) => `${count} weeks ago`,
    weekLabel: (week) => `Week ${week}`,
    weekKick: (week) => `Week ${week}`,
    phaseKick: (week, theme, phase) => `Week ${week} · ${theme} · ${phase}`,
    noteIndicator: "✎ note",
  },
};

const LOCALIZED_PHASES = {
  pt: PHASES,
  en: [
    { name: "Activation", r: [1, 4], color: "#E8472B", desc: "Attract the first creators and build a habit of participation." },
    { name: "Engagement", r: [5, 9], color: "#2F58E0", desc: "Deepen creation and consolidate the community." },
    { name: "Consolidation", r: [10, 13], color: "#178A5A", desc: "Recognition, co-creation, and a self-sustaining community." },
  ],
};

const DAY_OVERRIDES = {
  en: [
    { day: "Monday", theme: "Universe", fn: "Explore", objective: "Stay connected to the creator universe. Content that attracts new attention and deepens repertoire." },
    { day: "Tuesday", theme: "Ideas", fn: "Propose", objective: "Give the community a voice through debate, proposals, and collective imagination." },
    { day: "Wednesday", theme: "Meetup", fn: "Gather", objective: "Bring people together with intensity calibrated to the phase." },
    { day: "Thursday", theme: "Build", fn: "Create", objective: "Show that creating is a process. Tutorials and demos have high discovery potential." },
    { day: "Friday", theme: "Showcase", fn: "Recognize", objective: "Show what the community produced. Recognition attracts because whoever sees it wants to be part of it." },
  ],
  pt: [
    { syn: "Conteúdo sobre o universo criador — jogos, criadores e tendências." },
    { syn: "Participação por votação, debate e desafios de imaginação." },
    { syn: "Eventos, convidados e encontros com intensidade crescente." },
    { syn: "Prática de criação com tutoriais, IA e processo real." },
    { syn: "Exposição e reconhecimento do que a comunidade produziu." },
  ],
};

const OPTION_OVERRIDES_PT = {
  "0-0": {
    title: "Jogo da Semana",
    discordMsg: "Acabamos de postar sobre esse jogo. Agora a pergunta é sua: o que você mudaria nele? Uma mecânica, um personagem, uma fase — vale tudo. Posta aqui.",
    obj: "Expandir o repertório de criação.",
    fmt: "Vídeo curto com análise simples.",
    aud: "Jovens que já jogam Roblox.",
    script: [["Gancho", "\"Você sabe por que esse jogo prende tanta gente?\""], ["Contexto", "Mostre o jogo e explique uma mecânica fácil de entender."], ["Virada", "Conecte a mecânica à criação: \"como você faria diferente?\""], ["CTA", "\"Entre na comunidade — link na bio.\""]],
    caption: "Hoje a gente olha para um jogo de Roblox e tenta entender o que faz ele funcionar. O que você mudaria nele?",
    discordAction: "Thread: \"O que você mudaria nesse jogo?\"",
    care: "Use apenas trechos permitidos. Sem música sem licença. Evite imagens de menores."
  },
  "0-1": {
    title: "Criador da Semana",
    discordMsg: "Hoje trouxemos a história de um criador. E você: quem te inspira? Pode ser alguém do Roblox, do YouTube ou de qualquer área. Compartilhe aqui.",
    obj: "Mostrar que por trás de cada jogo existe uma pessoa com uma ideia.",
    fmt: "Vídeo curto de perfil.",
    aud: "Adolescentes interessados em criar.",
    script: [["Gancho", "\"Por trás desse jogo existe alguém criando cada detalhe.\""], ["Contexto", "Apresente o criador e o tipo de experiência que ele constrói."], ["Virada", "Mostre que criar começa com ideias simples."], ["CTA", "\"Entre na comunidade — link na bio.\""]],
    caption: "Todo jogo começa com alguém tentando construir uma ideia. Hoje damos destaque a um criador e perguntamos: que jogo você criaria?",
    discordAction: "Thread: \"Quem te inspira a criar?\"",
    care: "Use informações públicas. Evite expor dados pessoais do criador."
  },
  "0-2": {
    title: "Curiosidade Roblox",
    discordMsg: "Você já sabia dessa curiosidade de Roblox?\n👍 Já sabia\n🤯 Não sabia\nVote e, se quiser, conta onde descobriu.",
    obj: "Abrir a porta desse universo para quem ainda está do lado de fora.",
    fmt: "Vídeo de curiosidade.",
    aud: "Público amplo.",
    script: [["Gancho", "\"Essa curiosidade de Roblox parece falsa, mas é real.\""], ["Contexto", "Apresente o fato de forma simples e visual."], ["Virada", "Conecte o fato à criação ou ao comportamento dos jogadores."], ["CTA", "\"Conta pra gente — link na bio.\""]],
    caption: "Uma curiosidade rápida para começar a semana. Você já sabia disso?",
    discordAction: "Enquete: \"Você já sabia disso?\"",
    care: "Cheque a fonte antes de publicar. Evite números sem atribuição."
  },
  "0-3": {
    title: "Tendência da Semana",
    discordMsg: "Essa tendência veio para ficar ou some em duas semanas?\n🔥 Veio para ficar\n💨 Vai passar rápido\nVote e defenda sua escolha aqui.",
    obj: "Ler o momento do universo criador e gerar conversa oportuna.",
    fmt: "Vídeo de tendência.",
    aud: "Adolescentes que acompanham jogos e criadores.",
    script: [["Gancho", "\"Todo mundo está falando disso. Mas por quê?\""], ["Contexto", "Mostre a tendência e onde ela aparece."], ["Virada", "Ela tem potencial de criação ou é só uma moda passageira?"], ["CTA", "\"Debata com a gente — link na bio.\""]],
    caption: "A tendência da semana chegou. O que você acha: veio para ficar ou vai passar?",
    discordAction: "Votação: \"Tendência ou modinha?\"",
    care: "Evite incentivar comportamentos de risco para menores."
  },
  "1-0": {
    title: "Votação",
    discordMsg: "Hora de votar. Qual dessas ideias você jogaria? [Opção A] ou [Opção B]? Vote e explique em uma frase o porquê.",
    obj: "Estimular a primeira participação com barreira zero.",
    fmt: "Post ou Reels com escolha simples.",
    aud: "Público que ainda não entrou no Discord.",
    script: [["Gancho", "\"Qual dessas ideias você jogaria?\""], ["Contexto", "Apresente duas ou três opções com visual claro."], ["Virada", "Peça uma escolha rápida com justificativa em uma frase."], ["CTA", "\"Vote com a gente — link na bio.\""]],
    caption: "Escolha uma opção e defenda sua ideia.",
    discordAction: "Votação espelhada + thread para comentários.",
    care: "Evite perguntas que coletem dados pessoais como idade, escola ou localização."
  },
  "1-1": {
    title: "Pergunta da Semana",
    discordMsg: "Pergunta da semana: se você pudesse criar qualquer jogo no Roblox, qual seria? Pode ser uma ideia simples. Escreve aqui — a gente lê tudo.",
    obj: "Coletar ideias e abrir espaço para quem quer ser ouvido.",
    fmt: "Vídeo-pergunta.",
    aud: "Adolescentes de 13 a 18 anos que gostam de imaginar.",
    script: [["Gancho", "\"Se você pudesse criar qualquer jogo no Roblox, qual seria?\""], ["Contexto", "Dê 2 ou 3 exemplos para destravar respostas."], ["Virada", "Uma ideia simples pode virar protótipo."], ["CTA", "\"Manda sua ideia — link na bio.\""]],
    caption: "Pergunta da semana: que jogo você criaria no Roblox?",
    discordAction: "Thread fixa para receber ideias.",
    care: "Modere as respostas. Remova dados pessoais e conteúdos inadequados."
  },
  "1-2": {
    title: "Mini Desafio",
    discordMsg: "Mini desafio: você tem 30 segundos para inventar um personagem. Nome, poder especial e fraqueza. Manda aqui — sem filtro, vale a primeira ideia.",
    obj: "Gerar as primeiras entregas e mostrar que criar é acessível.",
    fmt: "Vídeo de desafio rápido.",
    aud: "Membros do Discord que querem experimentar.",
    script: [["Gancho", "\"Você tem 30 segundos para inventar um personagem.\""], ["Contexto", "Explique a tarefa em uma frase."], ["Virada", "Dê um exemplo rápido para ajudar."], ["CTA", "\"Manda sua resposta — link na bio.\""]],
    caption: "Mini desafio do dia: crie um personagem, uma missão ou um poder. Ideias simples também valem.",
    discordAction: "Canal ou thread para envio das respostas.",
    care: "Defina regra de respeito e moderação antes de receber envios."
  },
  "1-3": {
    title: "Batalha de Ideias",
    discordMsg: "Batalha de ideias. Quem venceria: [Ideia A] ou [Ideia B]? Escolha um lado e defenda com argumentos. Só votar não vale.",
    obj: "Gerar debate energético e trazer novos participantes pelo conflito de ideias.",
    fmt: "Vídeo de comparação.",
    aud: "Adolescentes que gostam de expressar opinião.",
    script: [["Gancho", "\"Qual jogo venceria: cidade mutante ou escola assombrada?\""], ["Contexto", "Apresente as duas ideias visualmente."], ["Virada", "Peça argumentos, não apenas votos."], ["CTA", "\"Entre na comunidade e defenda sua escolha — link na bio.\""]],
    caption: "Hoje tem batalha de ideias. Escolha um lado e defenda.",
    discordAction: "Dois tópicos, um para cada ideia.",
    care: "Modere a linguagem competitiva para evitar ataques pessoais."
  },
  "2-0": {
    title: "Live",
    discordMsg: "Live hoje às [horário]! Vamos criar algo ao vivo — você pode assistir e participar pelo chat. Ative o lembrete para não perder.",
    obj: "Construir presença e conexão quando já existe massa crítica.",
    fmt: "Vídeo-convite.",
    aud: "Participantes que já cogitam entrar.",
    script: [["Gancho", "\"Hoje vamos criar algo ao vivo.\""], ["Contexto", "Explique o tema, o horário e o que vai acontecer."], ["Virada", "Mostre o que a pessoa leva da live: ideia, técnica ou participação."], ["CTA", "\"Entre na comunidade — link na bio.\""]],
    caption: "Hoje tem live da Expedição Roblox. Veja o link na bio.",
    discordAction: "Evento, lembrete, sala de comentários e resumo pós-live.",
    care: "Informe as regras de moderação. Evite expor menores sem autorização."
  },
  "2-1": {
    title: "Convidado",
    discordMsg: "Um convidado vai participar da Expedição Roblox. Antes da conversa, você pode mandar sua pergunta. O que você quer saber sobre [tema do convidado]? Posta aqui.",
    obj: "Abrir uma janela para o mundo exterior — convidados atraem novos públicos.",
    fmt: "Vídeo teaser.",
    aud: "Adolescentes interessados em criação e carreira.",
    script: [["Gancho", "\"Quer perguntar algo para quem cria experiências digitais?\""], ["Contexto", "Apresente o convidado e o tema da conversa."], ["Virada", "A comunidade envia perguntas."], ["CTA", "\"Mande sua pergunta — link na bio.\""]],
    caption: "Um convidado vai participar da Expedição Roblox. Envie sua pergunta — link na bio.",
    discordAction: "Thread: \"Perguntas para o convidado\".",
    care: "Oriente perguntas respeitosas. Não colete dados pessoais."
  },
  "2-2": {
    title: "Oficina Aberta",
    discordMsg: "Oficina aberta! Vamos construir [o que será feito] passo a passo. Confirme sua presença aqui com ✅ e enviaremos os materiais antes.",
    obj: "Gerar entrega prática para quem já está comprometido.",
    fmt: "Vídeo-convite para oficina.",
    aud: "Membros do Discord que querem criar.",
    script: [["Gancho", "\"Quer criar sua primeira experiência no Roblox?\""], ["Contexto", "Explique o que será construído."], ["Virada", "A atividade é guiada e acessível."], ["CTA", "\"Confirme sua presença — link na bio.\""]],
    caption: "Oficina aberta na Expedição Roblox. Vamos criar juntos, passo a passo.",
    discordAction: "Canal de confirmação, materiais e entrega final.",
    care: "Deixe o nível de dificuldade claro. Use linguagem acessível para menores."
  },
  "2-3": {
    title: "Revisão de Projeto",
    discordMsg: "Nesta semana vamos revisar projetos da comunidade. Envie o seu — pode ser uma ideia, um print, um mapa, qualquer coisa que você esteja construindo.",
    obj: "Oferecer feedback público — a comunidade cuida de quem cria.",
    fmt: "Vídeo-convite.",
    aud: "Membros que têm uma ideia, print, mapa ou protótipo.",
    script: [["Gancho", "\"Quer que a gente olhe para o seu projeto?\""], ["Contexto", "Serão analisadas ideias, prints ou protótipos."], ["Virada", "O foco é ajudar a melhorar, não julgar."], ["CTA", "\"Envie seu projeto — link na bio.\""]],
    caption: "Envie seu projeto para revisão. Ideias, prints, mapas e protótipos são bem-vindos.",
    discordAction: "Fila de envio e regras de feedback.",
    care: "Peça autorização antes de exibir projetos. Sem dados de menores."
  },
  "3-0": {
    title: "Tutorial de Roblox",
    discordMsg: "Saiu tutorial novo. Teste e envie um print do seu resultado. Se travar em qualquer parte, poste aqui que a gente ajuda.",
    obj: "Aplicar aprendizado — e atrair quem procura como fazer algo.",
    fmt: "Tutorial curto.",
    aud: "Iniciantes que querem fazer algo concreto.",
    script: [["Gancho", "\"Hoje você vai aprender uma coisa simples para usar no seu jogo.\""], ["Contexto", "Mostre a ação passo a passo."], ["Virada", "Explique onde isso pode ser usado em um jogo."], ["CTA", "\"Teste e envie o resultado — link na bio.\""]],
    caption: "Tutorial rápido para criar algo simples no Roblox Studio.",
    discordAction: "Canal para dúvidas e envio de prints.",
    care: "Evite instruções técnicas longas. Mantenha adequado para iniciantes."
  },
  "3-1": {
    title: "IA Aplicada",
    discordMsg: "Usamos IA para criar [o que foi criado]. Agora é a sua vez. Teste um prompt e mande o resultado aqui — bom, ruim ou engraçado, tudo conta.",
    obj: "Mostrar a IA como parceira criativa — um tema com alto alcance orgânico.",
    fmt: "Demonstração curta.",
    aud: "Adolescentes curiosos sobre IA e criação.",
    script: [["Gancho", "\"Pedimos para a IA criar uma missão para Roblox.\""], ["Contexto", "Mostre o prompt e o resultado."], ["Virada", "Melhore a resposta da IA com critérios humanos."], ["CTA", "\"Compartilhe o que você criou — link na bio.\""]],
    caption: "A IA ajuda, mas quem decide é o criador. Teste um prompt e compartilhe o resultado.",
    discordAction: "Thread para prompts e melhorias.",
    care: "Oriente o uso responsável da IA. Sem dados pessoais nos prompts."
  },
  "3-2": {
    title: "Bastidores",
    discordMsg: "Mostramos o antes e o depois de um projeto. E você: tem algo em andamento? Poste uma versão atual aqui — qualquer estágio vale. A gente dá feedback.",
    obj: "Mostrar o processo real para quem já está criando.",
    fmt: "Vídeo de bastidores.",
    aud: "Membros que precisam ver que um projeto evolui em etapas.",
    script: [["Gancho", "\"Olha como essa ideia começou e como ela ficou.\""], ["Contexto", "Mostre a versão inicial e a versão ajustada."], ["Virada", "Explique uma decisão de melhoria."], ["CTA", "\"Que melhoria você faria? Link na bio.\""]],
    caption: "Todo projeto melhora em etapas. Hoje mostramos um antes e depois.",
    discordAction: "Pedido de feedback coletivo.",
    care: "Peça autorização antes de usar o projeto de um participante."
  },
  "3-3": {
    title: "Aprendendo com Erros",
    discordMsg: "Trouxemos um erro que acontece muito. Você já passou por isso? Ou tem outro bug que te enlouquece? Manda aqui — vamos tentar resolver juntos.",
    obj: "Tratar o erro como parte da criação — normalizar o processo.",
    fmt: "Vídeo de problema e solução.",
    aud: "Membros que se frustram quando algo dá errado.",
    script: [["Gancho", "\"Esse erro parece bobo, mas acontece bastante.\""], ["Contexto", "Mostre o problema."], ["Virada", "Explique a correção de forma simples."], ["CTA", "\"Qual erro você quer resolver? Link na bio.\""]],
    caption: "Erros também ensinam. Qual bug te travou? Compartilhe.",
    discordAction: "Canal para bugs e dúvidas.",
    care: "Foque no problema, não na pessoa. Sem exposição de participantes."
  },
  "4-0": {
    title: "Melhor Projeto",
    discordMsg: "Destaque de projeto da semana. Parabéns para [nome]! O que você achou mais criativo nesse projeto? Deixe um comentário aqui.",
    obj: "Mostrar para fora que essa comunidade produz.",
    fmt: "Vídeo destaque ou carrossel.",
    aud: "Comunidade e novas pessoas interessadas.",
    script: [["Gancho", "\"Olha o que a comunidade criou nesta semana.\""], ["Contexto", "Mostre o projeto e o que ele propõe."], ["Virada", "Destaque uma escolha criativa."], ["CTA", "\"Veja mais projetos — link na bio.\""]],
    caption: "Projeto destaque da semana. Mais criações vêm aí — siga para não perder.",
    discordAction: "Fixar no mural e abrir comentários positivos.",
    care: "Confirme autorização de uso de imagem, nome e projeto."
  },
  "4-1": {
    title: "Resultado do Concurso",
    discordMsg: "Resultado do desafio! Obrigado a todos que participaram. Veja o ranking completo fixado aqui. Na próxima semana tem novo desafio — fique de olho.",
    obj: "Fechar o ciclo e valorizar quem participou.",
    fmt: "Vídeo de resultados.",
    aud: "Participantes do desafio e público que acompanha.",
    script: [["Gancho", "\"Saiu o resultado do desafio desta semana.\""], ["Contexto", "Retome a proposta do concurso."], ["Virada", "Mostre vencedores e critérios de forma simples."], ["CTA", "\"Veja o ranking completo — link na bio.\""]],
    caption: "Resultado do desafio desta semana. Obrigado a todos que participaram.",
    discordAction: "Ranking, comentários e próximo desafio.",
    care: "Regras claras antes do concurso. Evite sorteio sem regulamento."
  },
  "4-2": {
    title: "Destaque da Comunidade",
    discordMsg: "O destaque de hoje vai para [nome], por [o que fez]. Esse tipo de atitude é o que faz a comunidade acontecer. Deixe uma mensagem para essa pessoa aqui.",
    obj: "Reforçar pertencimento e mostrar que comportamentos positivos são reconhecidos.",
    fmt: "Post de reconhecimento.",
    aud: "Membros ativos e quem está pensando em entrar.",
    script: [["Gancho", "\"O destaque de hoje vai para quem fez a comunidade acontecer.\""], ["Contexto", "Explique a participação reconhecida."], ["Virada", "Comportamento positivo: ajuda, evolução, colaboração."], ["CTA", "\"Participe — link na bio.\""]],
    caption: "Destaque da comunidade: participação, ajuda e crescimento também contam.",
    discordAction: "Menção pública e comentários de reconhecimento.",
    care: "Evite expor menores sem autorização. Prefira nicknames autorizados."
  },
  "4-3": {
    title: "Próximo Desafio",
    discordMsg: "Vem aí o próximo desafio. O tema é [pista do tema]. As regras completas estão fixadas neste canal. Se tiver dúvidas, pergunte aqui.",
    obj: "Criar antecipação — um gancho de atração para a semana seguinte.",
    fmt: "Vídeo teaser.",
    aud: "Público que ainda não entrou, mas gosta de desafios.",
    script: [["Gancho", "\"Na próxima semana tem um novo desafio.\""], ["Contexto", "Dê uma pista sobre o tema."], ["Virada", "Explique por que vale a pena participar."], ["CTA", "\"As regras estão te esperando — link na bio.\""]],
    caption: "O próximo desafio está a caminho. Fique de olho.",
    discordAction: "Regulamento simples e canal de dúvidas.",
    care: "Defina prazos, critérios e regras. Sem prêmio sem regulamento formal."
  },
};

const OPTION_OVERRIDES_EN = {
  "0-1": { discordAction: 'Thread: "Who inspires you to create?"', care: "Use public information. Avoid exposing the creator's personal data." },
  "0-2": { discordAction: 'Poll: "Did you already know this?"' },
  "1-0": { obj: "Stimulate a first contribution with zero friction." },
  "1-1": { discordAction: "Pinned thread to collect ideas." },
  "1-2": { discordAction: "Channel or thread for posting answers.", care: "Set rules for respect and moderation before collecting submissions." },
  "2-0": { aud: "Participants who are already considering joining." },
  "2-1": { discordAction: 'Thread: "Questions for the guest".' },
  "2-3": { fmt: "Invitation video.", aud: "Members who have an idea, screenshot, map, or prototype.", script: [["Hook", '"Want us to look at your project?"'], ["Context", "Ideas, screenshots, or prototypes can all be reviewed."], ["Turn", "The focus is on helping improve, not judging."], ["CTA", '"Send your project — link in bio."']], discordAction: "Submission queue and feedback rules." },
  "3-2": { discordAction: "Request for collective feedback." },
  "4-0": { care: "Confirm authorization to use image, name, and project." },
  "4-1": { discordAction: "Ranking, comments, and next challenge.", care: "Define clear rules before the contest. Avoid raffles without formal regulations." },
  "4-3": { fmt: "Teaser video.", discordAction: "Simple rules and question channel." },
};

const SKILL_LABELS_PT = {
  "Game mechanics design": "Design de mecânicas de jogo",
  "Critical analysis": "Análise crítica",
  "Systems thinking": "Pensamento sistêmico",
  "Creator identity": "Identidade criadora",
  "Career reference": "Referência de carreira",
  "Career trajectory": "Trajetória profissional",
  "Digital literacy": "Letramento digital",
  "Research and fact-checking": "Pesquisa e checagem de fatos",
  "Information synthesis": "Síntese da informação",
  "Context reading": "Leitura de contexto",
  "Trend analysis": "Análise de tendências",
  "Critical thinking": "Pensamento crítico",
  "Decision-making": "Tomada de decisão",
  "Argumentation": "Argumentação",
  "Opinion expression": "Expressão de opinião",
  "Creative thinking": "Pensamento criativo",
  "Conceptual design": "Design conceitual",
  "Idea articulation": "Articulação de ideias",
  "Rapid prototyping": "Prototipagem rápida",
  "Creativity": "Criatividade",
  "Execution": "Execução",
  "Structured debate": "Debate estruturado",
  "Oral communication": "Comunicação oral",
  "Digital presence": "Presença digital",
  "Collaboration": "Colaboração",
  "Active listening": "Escuta ativa",
  "Question formulation": "Formulação de perguntas",
  "Network building": "Construção de rede",
  "Hands-on learning": "Aprendizado prático",
  "Persistence": "Persistência",
  "Constructive feedback": "Feedback construtivo",
  "Critical assessment": "Avaliação crítica",
  "Assertive communication": "Comunicação assertiva",
  "Computational thinking": "Pensamento computacional",
  "Programming logic": "Lógica de programação",
  "Problem-solving": "Resolução de problemas",
  "Prompt engineering": "Engenharia de prompt",
  "AI literacy": "Letramento em IA",
  "Output evaluation": "Avaliação de resultados",
  "Project management": "Gestão de projetos",
  "Documentation": "Documentação",
  "Iteration": "Iteração",
  "Debugging": "Depuração",
  "Resilience": "Resiliência",
  "Trial-and-error learning": "Aprendizado por tentativa e erro",
  "Digital portfolio": "Portfólio digital",
  "Curation": "Curadoria",
  "Project communication": "Comunicação de projeto",
  "Criteria-based evaluation": "Avaliação por critérios",
  "Handling results": "Lidar com resultados",
  "Cycle completion": "Fechamento de ciclo",
  "Leadership": "Liderança",
  "Recognizing contribution": "Reconhecimento de contribuição",
  "Planning": "Planejamento",
  "Proposal communication": "Comunicação de proposta",
  "Audience engagement": "Engajamento de audiência",
};

const SKILL_CONTEXT_PT = {
  "Game mechanics design": "Entender por que uma regra de jogo funciona é pensamento de design de sistemas — a mesma lógica usada em produtos digitais, apps e experiências interativas.",
  "Critical analysis": "Perguntar \"por que isso funciona?\" antes de consumir algo é o ponto de partida do pensamento analítico exigido em tecnologia, negócios e comunicação.",
  "Systems thinking": "Ver como partes se conectam para formar um todo é a base da engenharia de software, da gestão de projetos e do design de produto.",
  "Creator identity": "Conseguir nomear o que você cria e por que cria é a base do portfólio profissional em qualquer área criativa ou técnica.",
  "Career reference": "Conhecer trajetórias reais de quem constrói coisas é uma das formas mais eficazes de imaginar caminhos profissionais concretos.",
  "Career trajectory": "Entender que uma carreira é construída por decisões, e não por destino, é uma competência de autogestão essencial no mercado atual.",
  "Digital literacy": "Saber encontrar, verificar e interpretar informações em ambientes digitais é tão essencial quanto ler e escrever — e cada vez mais exigido em qualquer profissão.",
  "Research and fact-checking": "Checar a fonte antes de compartilhar é o princípio do jornalismo, da ciência e de qualquer prática profissional séria.",
  "Information synthesis": "Transformar uma ideia complexa em algo claro e breve é uma das habilidades mais valorizadas em comunicação, produto e liderança.",
  "Context reading": "Perceber o que está acontecendo ao redor antes de agir é uma competência central em análise de mercado, estratégia e inteligência competitiva.",
  "Trend analysis": "Identificar padrões emergentes antes de virarem consenso é o que fazem analistas de produto, investidores e criadores estratégicos.",
  "Critical thinking": "Questionar antes de aceitar e argumentar com base em evidências é uma das competências mais pedidas em entrevistas de tecnologia e inovação.",
  "Decision-making": "Escolher entre opções com critérios e clareza é uma habilidade essencial em gestão, produto e qualquer posição de responsabilidade.",
  "Argumentation": "Defender uma posição com lógica e evidência — e não só emoção — é o núcleo da comunicação profissional e da liderança.",
  "Opinion expression": "Articular com clareza e respeito o que você pensa é uma habilidade que diferencia profissionais em reuniões, apresentações e negociações.",
  "Creative thinking": "Gerar ideias que ainda não existem, dentro de restrições reais, é o que fazem designers, engenheiros e empreendedores.",
  "Conceptual design": "Transformar uma intenção em proposta com forma é o primeiro passo de qualquer processo de design, arquitetura ou desenvolvimento de produto.",
  "Idea articulation": "Explicar o que está na sua cabeça de um jeito que outros entendam é uma das competências mais raras e valiosas do mercado.",
  "Rapid prototyping": "Materializar uma ideia rapidamente para testar é o método central do design thinking, da inovação e do desenvolvimento ágil.",
  "Creativity": "A capacidade de combinar elementos de forma nova e útil é o que mais diferencia profissionais em ambientes de alta incerteza.",
  "Execution": "Concluir o que foi começado, mesmo sob pressão, é uma habilidade rara e muito valorizada em qualquer contexto profissional.",
  "Structured debate": "Defender uma posição com argumentos, ouvir o outro lado e mudar de ideia quando necessário é a base do trabalho colaborativo de qualidade.",
  "Oral communication": "Falar em público com clareza e confiança é uma das habilidades mais pedidas em entrevistas e avaliações de desempenho.",
  "Digital presence": "Saber se comunicar e se posicionar em ambientes online é uma competência profissional tão importante quanto se apresentar bem em uma reunião.",
  "Collaboration": "Trabalhar com outras pessoas de forma que o resultado cresça — e não apenas o trabalho se divida — é a base de equipes de alto desempenho.",
  "Active listening": "Ouvir para entender, e não apenas para responder, é o que diferencia líderes eficazes de comunicadores comuns.",
  "Question formulation": "Fazer a pergunta certa vale mais do que ter a resposta pronta — é o que fazem jornalistas, pesquisadores e grandes líderes.",
  "Network building": "Criar relações profissionais com propósito e reciprocidade é uma das competências mais subestimadas e mais decisivas para carreiras longas.",
  "Hands-on learning": "Aprender fazendo, errando e ajustando é o método mais eficaz de aprendizado — e o mais exigido no trabalho real.",
  "Persistence": "Continuar diante de obstáculos sem abandonar o objetivo é uma das competências mais valorizadas por empregadores e empreendedores.",
  "Constructive feedback": "Dar e receber críticas de modo que melhorem o trabalho — sem atacar nem se defender — é uma habilidade pouco ensinada e sempre avaliada.",
  "Critical assessment": "Julgar qualidade com critérios claros, e não só gosto pessoal, é o que fazem editores, avaliadores, jurados e líderes de qualidade.",
  "Assertive communication": "Dizer o que precisa ser dito, com clareza e sem agressividade, é a base da liderança, da negociação e do trabalho em equipe.",
  "Computational thinking": "Decompor um problema em etapas, identificar padrões e criar soluções lógicas é o coração da programação — e de qualquer profissão que usa dados.",
  "Programming logic": "Escrever instruções que uma máquina executa corretamente é uma das habilidades técnicas mais demandadas globalmente.",
  "Problem-solving": "Identificar a causa raiz de um problema antes de tentar resolvê-lo é o que separa quem corrige sintomas de quem resolve causas.",
  "Prompt engineering": "Formular instruções precisas para sistemas de IA é uma nova competência técnica de alta demanda em todas as áreas que usam inteligência artificial.",
  "AI literacy": "Entender o que a IA pode e não pode fazer — e saber avaliar seus resultados — é uma competência essencial para os próximos anos.",
  "Output evaluation": "Julgar se um resultado gerado por IA é útil, correto e ético é uma habilidade humana insubstituível no trabalho com sistemas automatizados.",
  "Project management": "Planejar, organizar e acompanhar etapas para entregar algo dentro do prazo é a competência central de produto, engenharia e consultoria.",
  "Documentation": "Registrar decisões, processos e resultados com clareza é o que faz o trabalho de uma pessoa ser útil para outras — e transforma um time em organização.",
  "Iteration": "Melhorar progressivamente, em vez de buscar perfeição imediata, é o método de trabalho de startups, estúdios e times de produto.",
  "Debugging": "Encontrar onde uma lógica falha, e por quê, é uma das habilidades mais valiosas da programação — e um exercício analítico em qualquer área.",
  "Resilience": "Se recuperar de erros e tentativas frustradas sem desistir do objetivo é o que mais diferencia profissionais de carreira longa.",
  "Trial-and-error learning": "Testar hipóteses, observar resultados e ajustar é o método científico na prática — e a base do desenvolvimento de qualquer habilidade técnica.",
  "Digital portfolio": "Construir e apresentar uma coleção de trabalhos concluídos é a forma mais eficaz de demonstrar competência em áreas criativas e técnicas.",
  "Curation": "Selecionar, organizar e apresentar o que tem valor no meio do excesso disponível é uma habilidade de alta demanda em mídia, cultura e tecnologia.",
  "Project communication": "Apresentar o que foi feito, por que foi feito e o que foi aprendido é uma habilidade central em design, engenharia e gestão.",
  "Criteria-based evaluation": "Julgar com base em parâmetros claros e definidos — e não em preferência pessoal — é o que torna avaliações justas e aprendizado real.",
  "Handling results": "Lidar com vitórias e perdas com equilíbrio é uma competência emocional e profissional que determina a capacidade de continuar crescendo.",
  "Cycle completion": "Encerrar uma etapa com clareza e intenção — celebrando ou aprendendo — é o que permite que um time avance com energia renovada.",
  "Leadership": "Influenciar positivamente o comportamento de outras pessoas, sem precisar de autoridade formal, é uma das competências mais transformadoras do mercado.",
  "Recognizing contribution": "Identificar e nomear o que outras pessoas fizeram bem é uma prática de gestão e liderança que multiplica o engajamento do time.",
  "Planning": "Antecipar etapas, recursos e obstáculos antes de começar reduz desperdício e aumenta a chance de entrega em projetos de qualquer escala.",
  "Proposal communication": "Apresentar uma ideia de forma que inspire ação nos outros é a base do empreendedorismo, da liderança e de qualquer papel que envolva persuasão.",
  "Audience engagement": "Criar conteúdo que leve as pessoas a agir — e não apenas consumir — é uma habilidade central em marketing, comunicação e design de experiências.",
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeOption(base, overrides) {
  return { ...base, ...overrides };
}

function localizeDays(locale) {
  return DAYS.map((day, dayIndex) => {
    const localizedDay = { ...clone(day), ...(DAY_OVERRIDES[locale]?.[dayIndex] || {}) };

    localizedDay.options = day.options.map((option, optionIndex) => {
      const key = `${dayIndex}-${optionIndex}`;
      const overrides = locale === "pt" ? OPTION_OVERRIDES_PT[key] : OPTION_OVERRIDES_EN[key];
      let localizedOption = mergeOption(clone(option), overrides || {});

      if (locale === "pt") {
        localizedOption.skills = (localizedOption.skills || []).map((skill) => SKILL_LABELS_PT[skill] || skill);
      }

      return localizedOption;
    });

    return localizedDay;
  });
}

function localizeSkillContexts(locale) {
  if (locale === "en") {
    return SKILL_CONTEXT;
  }

  return Object.fromEntries(
    Object.entries(SKILL_CONTEXT).map(([skill]) => [SKILL_LABELS_PT[skill] || skill, SKILL_CONTEXT_PT[skill] || SKILL_CONTEXT[skill]]),
  );
}

export function getLocaleBundle(locale) {
  const resolvedLocale = locale === "en" ? "en" : "pt";

  return {
    locale: resolvedLocale,
    ui: UI_TEXT[resolvedLocale],
    phases: LOCALIZED_PHASES[resolvedLocale],
    days: localizeDays(resolvedLocale),
    skillContext: localizeSkillContexts(resolvedLocale),
  };
}
