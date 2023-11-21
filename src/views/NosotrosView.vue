<template>
  <v-container>
    <v-row>
      <!-- Encabezado con el título "Bienes Raíces" -->
      <v-col class="text-center">
        <h1 class="display-2 py-15">NOSOTROS</h1>
      </v-col>
    </v-row>

    <!-- Una fila horizontal con las tarjetas redondas -->
    <v-row justify="center" align="center">
      <v-col v-for="member in team" :key="member.name" cols="12" md="6" lg="3">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-avatar size="150">
            <v-img :src="member.image" alt="Team Member"></v-img>
          </v-avatar>

          <v-card-title class="text-h5">{{ member.name }}</v-card-title>
          <v-card-subtitle>{{ member.role }}</v-card-subtitle>

          <v-card-text>
            {{ member.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      team: [
        {
          name: 'Joan Mosquera',
          role: 'Agente de Bienes Raíces',
          description: 'Como agente de propiedades, mi objetivo es convertir tus sueños de hogar en una realidad palpable. Con un profundo conocimiento del mercado inmobiliario, estoy comprometido a ayudarte a encontrar la propiedad perfecta que se adapte a tus necesidades y estilo de vida. ',
          image: "src/assets/img/JM.jpeg",
        },
        {
          name: 'Karen Holguin',
          role: 'Especialista en Propiedades',
          description: 'Como especialista en propiedades, mi misión es brindarte un servicio personalizado y conocimientos especializados en el fascinante mundo del mercado inmobiliario. Mi día a día implica sumergirme en el análisis del mercado, evaluando las tendencias y condiciones económicas para ofrecerte una visión clara y precisa.',
           image: "src/assets/img/KAH.jpeg",
        },
        {
          name: 'Kevin Holguin',
          role: 'Inversionista Bienes raices',
          description: 'Como inversionista de bienes raíces, mi enfoque se centra en identificar oportunidades estratégicas que generen retornos sólidos a lo largo del tiempo. Mi pasión por el mercado inmobiliario va más allá de simplemente comprar y vender propiedades; busco inversiones que no solo ofrezcan un potencial de apreciación, sino también flujos de efectivo estables.',
          image: "src/assets/img/KH.jpeg",
        },
        {
          name: 'Mayerli Giraldo',
          role: 'Gerente administrativo Bienes raices',
          description: 'Como gerente administrativo, lidero con el objetivo de mantener la excelencia operativa en todas las áreas administrativas de la empresa. Mi enfoque es lograr una eficiencia máxima en los procesos internos, optimizando los recursos y garantizando que cada departamento funcione de manera sincronizada.',
           image: "src/assets/img/MG.jpeg",
        },
      
      ],
    };
  },
};
</script>