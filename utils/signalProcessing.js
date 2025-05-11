// Codage en ligne
export const encodeLine = (binary, type) => {
    const result = [];
    for (let i = 0; i < binary.length; i++) {
      const bit = binary[i];
      switch(type) {
        case 'nrz':
          result.push(bit === '1' ? 1 : -1);
          break;
        case 'rz':
          result.push(bit === '1' ? 1 : 0);
          if (i < binary.length - 1) result.push(0);
          break;
        case 'manchester':
          result.push(bit === '1' ? 1 : -1);
          result.push(bit === '1' ? -1 : 1);
          break;
        default:
          result.push(bit === '1' ? 1 : -1);
      }
    }
    return result;
  };
  
  // Filtre d'émission
  export const applyEmissionFilter = (signal) => {
    return signal.map((value, index) => {
      // Simulation d'un filtrage passe-bas
      const prev = index > 0 ? signal[index-1] : 0;
      return value * 0.8 + prev * 0.2;
    });
  };
  
  // Modulation
  export const modulateSignal = (signal, type) => {
    return signal.map((value, index) => {
      const t = index * 0.1;
      switch(type) {
        case 'ask':
          return value * Math.sin(t * 2 * Math.PI);
        case 'fsk':
          return Math.sin(t * 2 * Math.PI * (value > 0 ? 2 : 1));
        case 'psk':
          return Math.sin(t * 2 * Math.PI + (value > 0 ? 0 : Math.PI));
        default:
          return value * Math.sin(t * 2 * Math.PI);
      }
    });
  };
  
  // Ajout de bruit
  export const addNoise = (signal, level) => {
    return signal.map(value => {
      const noise = (Math.random() * 2 - 1) * level;
      return value + noise;
    });
  };
  
  // Démodulation
  export const demodulateSignal = (signal, type) => {
    return signal.map((value, index) => {
      const t = index * 0.1;
      switch(type) {
        case 'ask':
          return value * Math.sin(t * 2 * Math.PI) * 2;
        case 'fsk':
          const f1 = Math.sin(t * 2 * Math.PI * 1);
          const f2 = Math.sin(t * 2 * Math.PI * 2);
          return Math.abs(value * f1) < Math.abs(value * f2) ? 1 : -1;
        case 'psk':
          return Math.cos(t * 2 * Math.PI) * value > 0 ? 1 : -1;
        default:
          return value * Math.sin(t * 2 * Math.PI) * 2;
      }
    });
  };
  
  // Filtre de réception
  export const applyReceptionFilter = (signal) => {
    const filtered = [];
    for (let i = 0; i < signal.length; i++) {
      const prev = i > 1 ? signal[i-2] * 0.2 : 0;
      const curr = signal[i];
      const next = i < signal.length - 2 ? signal[i+2] * 0.2 : 0;
      filtered.push(prev + curr * 0.6 + next);
    }
    return filtered;
  };
  
  // Récupération d'horloge
  export const recoverClock = (signal, encodingType) => {
    // Simplification: on suppose qu'on connaît le type d'encodage
    let period = 1;
    if (encodingType === 'rz') period = 2;
    if (encodingType === 'manchester') period = 2;
    
    // Trouver le meilleur point d'échantillonnage
    let maxEnergy = -Infinity;
    let bestPhase = 0;
    
    for (let phase = 0; phase < period; phase += 0.1) {
      let energy = 0;
      for (let i = Math.floor(phase); i < signal.length; i += period) {
        energy += Math.abs(signal[i]);
      }
      if (energy > maxEnergy) {
        maxEnergy = energy;
        bestPhase = phase;
      }
    }
    
    return { period, phase: bestPhase };
  };
  
  // Échantillonnage
  export const sampleSignal = (signal, clock) => {
    const sampled = [];
    for (let i = Math.floor(clock.phase); i < signal.length; i += clock.period) {
      sampled.push(signal[i]);
    }
    return sampled;
  };
  
  // Décision
  export const makeDecision = (samples) => {
    return samples.map(value => value > 0 ? '1' : '0').join('');
  };