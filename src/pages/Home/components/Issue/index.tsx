// import { dateFormatter } from "../../../../utils/formatter";
import { IIssues } from '../Summary';
import { IssuesContainer, StyledNavLink } from './styles';

export function Issue({ html_url, title, body, created_at }: IIssues) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'space-between',
      }}
    >
      <IssuesContainer>
        <StyledNavLink to={html_url}>
          <div>
            <h2>{title}</h2>
            <span>{new Date(created_at).toLocaleString()}</span>{' '}
          </div>
          <div>
            <p> {body?.slice(0, 200)}</p>
          </div>
        </StyledNavLink>
      </IssuesContainer>
    </div>
  );
}
