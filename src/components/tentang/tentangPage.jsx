// TentangPage.jsx
import React from 'react';
import { useTentangPresenter } from './tentangPresenter'; // Corrected import
import './tentang.css';

export default function TentangPage() {
  const { teamMembers, tentangKamiText } = useTentangPresenter(); // Call the hook and destructure

  return (
    <main className=" text-black font-[Montserrat] px-6 py-12 max-w-[1120px] mx-auto">
      {/* Tentang Kami */}
      <section className="flex flex-col md:flex-row md:items-start md:space-x-20 about-us max-w-[800px] mx-auto">
        <img
          src="https://storage.googleapis.com/a1aa/image/c0704c84-0c80-44fa-3560-55ea4bc64b79.jpg"
          alt="Graduation"
          className="w-full md:w-[400px] rounded-md object-cover mb-8 md:mb-0"
        />
        <div className="max-w-[400px]">
          <h2 className="text-green-400 text-xl font-extrabold mb-6">Tentang Kami</h2>
          {tentangKamiText.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </section>

      {/* Our Team */}
      <h3 className="team-title">Our Team</h3>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {teamMembers.map((member, index) => (
          <article className="team-card" key={index}>
            <img src={member.image} alt={member.name} className="w-full h-[240px] object-cover" />
            <div className="p-5">
              <p className="name">{member.name}</p>
              <p className="role">{member.role}</p>
              <p className="university">{member.university}</p>
              <div className="icons flex">
                <a href={member.github} aria-label={`GitHub profile of ${member.name}`}>
                  <i className="fab fa-github"></i>
                </a>
                <a href={member.linkedin} aria-label={`LinkedIn profile of ${member.name}`}>
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
