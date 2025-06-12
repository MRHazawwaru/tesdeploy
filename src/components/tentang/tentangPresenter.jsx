// TentangPresenter.jsx
import { useEffect, useState } from 'react';

export const useTentangPresenter = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [tentangKamiText, setTentangKamiText] = useState([]);

  useEffect(() => {
    const text = [
      'Сегодня 3 декабря 2020 года в Академии цифровых инноваций состоялось вручение сертификатов выпускникам курса Фронтенд-разработки.',
      'Поздравляем выпускников курса веб-разработки с окончанием обучения и вручением сертификатов!',
      'Нельзя останавливаться на достигнутом, нужно продолжать идти вперед и изучать новые технологии. Желаем всем выпускникам курса достигнуть всех поставленных целей!',
      'Коллектив АЦИ выражает огромную благодарность GIZ за поддержку, а также за книги, предоставленные в дар нашей библиотеке!',
    ];

    const data = [
      {
        name: 'Adrian Ramdhany',
        role: 'Machine Learning',
        university: 'Universitas Negeri Yogyakarta',
        image: 'https://storage.googleapis.com/a1aa/image/6a3fff81-26e9-4d1b-bd0d-651ce95d72b2.jpg',
        github: '#',
        linkedin: '#',
      },
      {
        name: 'Irfan Nur Fahrudin',
        role: 'Machine Learning',
        university: 'Universitas Gadjah Mada',
        image: 'https://storage.googleapis.com/a1aa/image/26721275-fe26-4401-c6fd-5f6284f062a0.jpg',
        github: '#',
        linkedin: '#',
      },
      {
        name: 'Priscilia Amanda Regina',
        role: 'Front End Back End',
        university: 'Universitas Mercu Buana Yogyakarta',
        image: 'https://storage.googleapis.com/a1aa/image/26721275-fe26-4401-c6fd-5f6284f062a0.jpg',
        github: '#',
        linkedin: '#',
      },
      {
        name: 'Muchammad Rofky Hazawwaru',
        role: 'Front End Back End',
        university: 'Universitas Mercu Buana Yogyakarta',
        image: 'https://storage.googleapis.com/a1aa/image/26721275-fe26-4401-c6fd-5f6284f062a0.jpg',
        github: '#',
        linkedin: '#',
      },
      {
        name: 'Reyhan Dwi Wira Allofadieka',
        role: 'Front End Back End',
        university: 'Universitas Mercu Buana Yogyakarta',
        image: 'https://storage.googleapis.com/a1aa/image/26721275-fe26-4401-c6fd-5f6284f062a0.jpg',
        github: '#',
        linkedin: '#',
      },
    ];
    setTentangKamiText(text);
    setTeamMembers(data);
  }, []);

  return {
    teamMembers,
    tentangKamiText,
  };
};
