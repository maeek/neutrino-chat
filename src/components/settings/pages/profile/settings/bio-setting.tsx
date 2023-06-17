import { getMeBio, getMeUsername } from '@/selectors/user';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ProceedButton,
  Heading,
  useAccessibility,
  Text,
  Paragraph
} from '@maeek/neutrino-design';
import './bio-setting.scss';
import { updateMeBasicInfo } from '@/actions/me';

export const BioSetting = () => {
  const dispath = useDispatch();
  const username = useSelector(getMeUsername);
  const bioText = useSelector(getMeBio);
  const [isEdited, setIsEdited] = useState(false);
  const [content, setContent] = useState(bioText);
  const { onEnter } = useAccessibility();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const save = async () => {
    await dispath(updateMeBasicInfo(username, { description: content }));
    setIsEdited(false);
  };

  const onCancelHandler = () => {
    setIsEdited(false);
    setContent(bioText);
    if (inputRef.current) inputRef.current.value = bioText;
  };

  return (
    <div className='setting-bio-preview-container'>
      <Heading level={4}>Description</Heading>
      <Paragraph>
        This is your public description. It will be visible to everyone who
        visits your profile.
      </Paragraph>
      <textarea
        ref={inputRef}
        maxLength={255}
        className='setting-bio-preview'
        onChange={(e) => {
          setContent(e.target.value);
          setIsEdited(e.target.value !== bioText);
        }}
        value={content}
      />
      <div className='image-change-footer'>
        <Text
          tabIndex={0}
          className='image-change-cancel'
          strong
          onClick={onCancelHandler}
        >
          Cancel
        </Text>
        <ProceedButton
          type='button'
          disabled={!isEdited}
          onKeyDown={onEnter(save)}
          onClick={save}
          className='setting-bio-button'
        >
          Save
        </ProceedButton>
      </div>
    </div>
  );
};

export default BioSetting;
