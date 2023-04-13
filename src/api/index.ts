import { Dotaznik, ZaznamDotazniku } from '../schema/generated/types';

export async function loadQuestionnaire(code: string): Promise<Dotaznik> {
  try {
    const response = await fetch(`{API_URL}/dotaznik/` + code);
    if (!response.ok) {
      throw new Error();
    }
    const data: Dotaznik = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function submitQuestionnaire(data: ZaznamDotazniku): Promise<void> {
  try {
    const response = await fetch(`{API_URL}/zaznam-dotazniku`, {
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
    throw error;
  }
}
