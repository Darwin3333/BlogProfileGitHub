// import { dateFormatter } from "../../../../utils/formatter";
import { IIssues } from '../Summary';
import { IssuesContainer, StyledNavLink } from './styles';

export function Issue({ id, title, body, html_url, created_at }: IIssues) {
  return (
    <IssuesContainer>
      <StyledNavLink to="/issue">
        <div>
          <h2>{title}</h2>
          <span>{new Date(created_at).toLocaleString()}</span>{' '}
        </div>
        <div style={{ color: 'white', marginTop: '60px' }}> {body}</div>
      </StyledNavLink>
    </IssuesContainer>
  );
}
