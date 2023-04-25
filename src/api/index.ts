import { Dotaznik, QueryResultListDto, ZaznamDotazniku } from '../schema/generated/types';

export async function loadQuestionnaire(code: string): Promise<Dotaznik> {
  try {
    const response = await fetch(`{API_URL}/dotaznik/list?kod=` + code);
    if (!response.ok) {
      throw new Error();
    }
    const data: QueryResultListDto = await response.json();
    const questionnaires = data.list as Dotaznik[];
    const questionnaire = questionnaires.find((questionnaire) => questionnaire.nadchazejiciVerzeDotaznikuId === null) || null;
    if (questionnaire) {
      return questionnaire;
    }
    throw new Error();
  } catch (error) {
    throw error;
  }
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(`{API_URL}/zaznam-dotazniku/count?token=` + token);
    if (!response.ok) {
      throw new Error();
    }
    const data: QueryResultListDto = await response.json();
    return (data.count === 0) ? true : false;
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
    const questionnaireId = await response.text();
    const pattern = /^-?\d+$/;
    if (pattern.test(questionnaireId) === false) {
      throw new Error();
    }
  } catch (error) {
    throw error;
  }
}
