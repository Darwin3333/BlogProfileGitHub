import { SummaryAnchors, SummaryContainer, SummaryHeader } from './styles';
import { ArrowUpRight, Buildings, GithubLogo, Users } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../../../../lib/api';

export function Summary() {
  const [profile, setProfile] = useState();

  //type IProfile{

  async function fetchUser() {
    const response = await api.get('/user/darwin3333');
    console.log(response);
  }

  useEffect(() => {
    fetchUser();
  }, []);
  // "https://api.github.com/users", "/lucaspedronet"
  // "https://api.github.com/search"
  // "https://api.github.com/repos/lucaspedronet/TudoLista/issues"

  return (
    <SummaryContainer>
      <img src="../src/assets/avatar.JPG" />
      <section>
        <SummaryHeader>
          <h1>Lucas Pedro</h1>
          <a href="#" target="_blank">
            GITHUB
            <ArrowUpRight size={12} />
          </a>
        </SummaryHeader>
        <p>
          Software Engineering. developer at NodeJS, ReactJS, React Native,
          Electron.
        </p>
        <SummaryAnchors>
          <div>
            <GithubLogo size={18} />
            <span>lucaspedronet</span>
          </div>

          <div>
            <Buildings size={18} />
            <span>Paraná Banco</span>
          </div>

          <div>
            <Users size={18} />
            <span>47</span>
          </div>
        </SummaryAnchors>
      </section>
    </SummaryContainer>
  );
}
