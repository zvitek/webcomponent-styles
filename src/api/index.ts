import { Dotaznik, ZaznamDotazniku } from '../schema/generated/types';

export async function loadQuestionnaire(): Promise<Dotaznik> {
  try {
    const response = await fetch(`https://mpsv-ivp-lb.assecosk.local/dotazniky/rest/dotaznik/14`);
    if (!response.ok) {
      throw new Error();
    }
    const data: Dotaznik = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function submitQuestionnaire(data: ZaznamDotazniku): Promise<void> {
  try {
    const response = await fetch(`https://mpsv-ivp-lb.assecosk.local/dotazniky/rest/zaznam-dotazniku`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error();
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
