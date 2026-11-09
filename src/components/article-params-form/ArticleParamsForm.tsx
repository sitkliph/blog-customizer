import {
  fontFamilyOptions,
  defaultArticleState,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  type ArticleStateType,
  type OptionType,
} from '@/constants/articleProps.ts';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import { clsx } from 'clsx';
import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import { useOutsideClickClose } from '@hooks/useOutsideClickClose.ts';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = ({
  onApply,
}: {
  onApply: (settings: ArticleStateType) => void;
}): React.JSX.Element => {
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const handleFieldChange =
    (field: keyof ArticleStateType) =>
    (value: OptionType): void => {
      setFormState((prevState) => ({ ...prevState, [field]: value }));
    };

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  useOutsideClickClose({
    isOpen: isSidebarOpen,
    rootRef: sidebarRef,
    onChange: setIsSidebarOpen,
  });

  return (
    <div ref={sidebarRef}>
      <ArrowButton
        isOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen((wasOpen) => !wasOpen)}
      />
      <aside
        className={clsx(styles.container, { [styles.container_open]: isSidebarOpen })}
      >
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            onApply(formState);
          }}
          onReset={(event) => {
            event.preventDefault();
            setFormState(defaultArticleState);
            onApply(defaultArticleState);
          }}
        >
          <div className={styles.topContainer}>
            <Text as={'h2'} weight={800} uppercase={true} size={31}>
              Задайте параметры
            </Text>
            <Select
              selected={formState.fontFamilyOption}
              options={fontFamilyOptions}
              title={'Шрифт'}
              onChange={handleFieldChange('fontFamilyOption')}
            />
            <RadioGroup
              name={'font-size'}
              options={fontSizeOptions}
              selected={formState.fontSizeOption}
              title={'Размер шрифта'}
              onChange={handleFieldChange('fontSizeOption')}
            />
            <Select
              selected={formState.fontColor}
              options={fontColors}
              title={'Цвет шрифта'}
              onChange={handleFieldChange('fontColor')}
            />
            <Separator />
            <Select
              selected={formState.backgroundColor}
              options={backgroundColors}
              title={'Цвет фона'}
              onChange={handleFieldChange('backgroundColor')}
            />
            <Select
              selected={formState.contentWidth}
              options={contentWidthArr}
              title={'Ширина контента'}
              onChange={handleFieldChange('contentWidth')}
            />
          </div>
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
