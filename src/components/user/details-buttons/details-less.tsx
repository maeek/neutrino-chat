import { ActionButton } from '@maeek/neutrino-design';
import { MouseEventHandler } from 'react';
import './details.scss';

export interface DetailsButtonShowLessProps {
  isVisible?: boolean;
  onClick?: MouseEventHandler;
}

export const DetailsButtonShowLess = ({ isVisible, onClick }: DetailsButtonShowLessProps) => (
  isVisible
    ? (
      <ActionButton
        onClick={onClick}
        type="button"
        className="user-info-thumb-action"
      >
        Work in progress
      </ActionButton>
    )
    : null
       
);

export default DetailsButtonShowLess;
