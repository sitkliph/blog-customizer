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
import { useOutsideClickClose } from '@/ui/select/hooks/useOutsideClickClose.ts';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = ({
  onApply,
}: {
  onApply: (settings: ArticleStateType) => void;
}): React.JSX.Element => {
  const [font, setFont] = useState<OptionType>(defaultArticleState.fontFamilyOption);
  const [fontSize, setFontSize] = useState<OptionType>(
    defaultArticleState.fontSizeOption
  );
  const [fontColor, setFontColor] = useState<OptionType>(defaultArticleState.fontColor);
  const [backgroundColor, setBackgroundColor] = useState<OptionType>(
    defaultArticleState.backgroundColor
  );
  const [contentWidth, setContentWidth] = useState<OptionType>(
    defaultArticleState.contentWidth
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  useOutsideClickClose({
    isOpen,
    rootRef: sidebarRef,
    onChange: setIsOpen,
  });

  return (
    <div ref={sidebarRef}>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen((wasOpen) => !wasOpen)} />
      <aside
        className={
          isOpen ? `${styles.container} ${styles.container_open}` : styles.container
        }
      >
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            onApply({
              fontFamilyOption: font,
              fontSizeOption: fontSize,
              fontColor,
              backgroundColor,
              contentWidth,
            });
          }}
          onReset={(event) => {
            event.preventDefault();
            setFont(defaultArticleState.fontFamilyOption);
            setFontSize(defaultArticleState.fontSizeOption);
            setFontColor(defaultArticleState.fontColor);
            setBackgroundColor(defaultArticleState.backgroundColor);
            setContentWidth(defaultArticleState.contentWidth);
            onApply(defaultArticleState);
          }}
        >
          <div className={styles.topContainer}>
            <Text as={'h2'} weight={800} uppercase={true} size={31}>
              Задайте параметры
            </Text>
            <Select
              selected={font}
              options={fontFamilyOptions}
              title={'Шрифт'}
              onChange={setFont}
            />
            <RadioGroup
              name={'font-size'}
              options={fontSizeOptions}
              selected={fontSize}
              title={'Размер шрифта'}
              onChange={setFontSize}
            />
            <Select
              selected={fontColor}
              options={fontColors}
              title={'Цвет шрифта'}
              onChange={setFontColor}
            />
            <Separator />
            <Select
              selected={backgroundColor}
              options={backgroundColors}
              title={'Цвет фона'}
              onChange={setBackgroundColor}
            />
            <Select
              selected={contentWidth}
              options={contentWidthArr}
              title={'Ширина контента'}
              onChange={setContentWidth}
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
