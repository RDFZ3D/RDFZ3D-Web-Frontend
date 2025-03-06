<script lang="ts">
    import TopAppBar, {AutoAdjust, Row, Section, Title} from '@smui/top-app-bar';
    import '../app.css';

    let {children} = $props();
    let topAppBar: TopAppBar | null = $state(null);
</script>

<TopAppBar bind:this={topAppBar} variant="fixed">
  <Row>
    <Section>
      <Title>RDFZ3D</Title>
    </Section>
  </Row>

</TopAppBar>
<AutoAdjust {topAppBar}>
  {@render children()}
</AutoAdjust>