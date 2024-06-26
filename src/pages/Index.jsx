import React, { useState, useRef, useEffect } from "react";
import { Container, Text, VStack, Input, Button, Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, keyframes } from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const hiragana = [
  { char: "あ", romaji: "a" },
  { char: "い", romaji: "i" },
  { char: "う", romaji: "u" },
  { char: "え", romaji: "e" },
  { char: "お", romaji: "o" },
  { char: "か", romaji: "ka" },
  { char: "き", romaji: "ki" },
  { char: "く", romaji: "ku" },
  { char: "け", romaji: "ke" },
  { char: "こ", romaji: "ko" },
  { char: "さ", romaji: "sa" },
  { char: "し", romaji: "shi" },
  { char: "す", romaji: "su" },
  { char: "せ", romaji: "se" },
  { char: "そ", romaji: "so" },
  { char: "た", romaji: "ta" },
  { char: "ち", romaji: "chi" },
  { char: "つ", romaji: "tsu" },
  { char: "て", romaji: "te" },
  { char: "と", romaji: "to" },
  { char: "な", romaji: "na" },
  { char: "に", romaji: "ni" },
  { char: "ぬ", romaji: "nu" },
  { char: "ね", romaji: "ne" },
  { char: "の", romaji: "no" },
  { char: "は", romaji: "ha" },
  { char: "ひ", romaji: "hi" },
  { char: "ふ", romaji: "fu" },
  { char: "へ", romaji: "he" },
  { char: "ほ", romaji: "ho" },
  { char: "ま", romaji: "ma" },
  { char: "み", romaji: "mi" },
  { char: "む", romaji: "mu" },
  { char: "め", romaji: "me" },
  { char: "も", romaji: "mo" },
  { char: "や", romaji: "ya" },
  { char: "ゆ", romaji: "yu" },
  { char: "よ", romaji: "yo" },
  { char: "ら", romaji: "ra" },
  { char: "り", romaji: "ri" },
  { char: "る", romaji: "ru" },
  { char: "れ", romaji: "re" },
  { char: "ろ", romaji: "ro" },
  { char: "わ", romaji: "wa" },
  { char: "を", romaji: "wo" },
  { char: "ん", romaji: "n" },
  { char: "が", romaji: "ga" },
  { char: "ぎ", romaji: "gi" },
  { char: "ぐ", romaji: "gu" },
  { char: "げ", romaji: "ge" },
  { char: "ご", romaji: "go" },
  { char: "ざ", romaji: "za" },
  { char: "じ", romaji: "ji" },
  { char: "ず", romaji: "zu" },
  { char: "ぜ", romaji: "ze" },
  { char: "ぞ", romaji: "zo" },
  { char: "だ", romaji: "da" },
  { char: "ぢ", romaji: "ji" },
  { char: "づ", romaji: "zu" },
  { char: "で", romaji: "de" },
  { char: "ど", romaji: "do" },
  { char: "ば", romaji: "ba" },
  { char: "び", romaji: "bi" },
  { char: "ぶ", romaji: "bu" },
  { char: "べ", romaji: "be" },
  { char: "ぼ", romaji: "bo" },
  { char: "ぱ", romaji: "pa" },
  { char: "ぴ", romaji: "pi" },
  { char: "ぷ", romaji: "pu" },
  { char: "ぺ", romaji: "pe" },
  { char: "ぽ", romaji: "po" },
  { char: "きゃ", romaji: "kya" },
  { char: "きゅ", romaji: "kyu" },
  { char: "きょ", romaji: "kyo" },
  { char: "しゃ", romaji: "sha" },
  { char: "しゅ", romaji: "shu" },
  { char: "しょ", romaji: "sho" },
  { char: "ちゃ", romaji: "cha" },
  { char: "ちゅ", romaji: "chu" },
  { char: "ちょ", romaji: "cho" },
  { char: "にゃ", romaji: "nya" },
  { char: "にゅ", romaji: "nyu" },
  { char: "にょ", romaji: "nyo" },
  { char: "ひゃ", romaji: "hya" },
  { char: "ひゅ", romaji: "hyu" },
  { char: "ひょ", romaji: "hyo" },
  { char: "みゃ", romaji: "mya" },
  { char: "みゅ", romaji: "myu" },
  { char: "みょ", romaji: "myo" },
  { char: "りゃ", romaji: "rya" },
  { char: "りゅ", romaji: "ryu" },
  { char: "りょ", romaji: "ryo" },
  { char: "ぎゃ", romaji: "gya" },
  { char: "ぎゅ", romaji: "gyu" },
  { char: "ぎょ", romaji: "gyo" },
  { char: "じゃ", romaji: "ja" },
  { char: "じゅ", romaji: "ju" },
  { char: "じょ", romaji: "jo" },
  { char: "びゃ", romaji: "bya" },
  { char: "びゅ", romaji: "byu" },
  { char: "びょ", romaji: "byo" },
  { char: "ぴゃ", romaji: "pya" },
  { char: "ぴゅ", romaji: "pyu" },
  { char: "ぴょ", romaji: "pyo" },
];

const katakana = [
  { char: "ア", romaji: "a" },
  { char: "イ", romaji: "i" },
  { char: "ウ", romaji: "u" },
  { char: "エ", romaji: "e" },
  { char: "オ", romaji: "o" },
  { char: "カ", romaji: "ka" },
  { char: "キ", romaji: "ki" },
  { char: "ク", romaji: "ku" },
  { char: "ケ", romaji: "ke" },
  { char: "コ", romaji: "ko" },
  { char: "サ", romaji: "sa" },
  { char: "シ", romaji: "shi" },
  { char: "ス", romaji: "su" },
  { char: "セ", romaji: "se" },
  { char: "ソ", romaji: "so" },
  { char: "タ", romaji: "ta" },
  { char: "チ", romaji: "chi" },
  { char: "ツ", romaji: "tsu" },
  { char: "テ", romaji: "te" },
  { char: "ト", romaji: "to" },
  { char: "ナ", romaji: "na" },
  { char: "ニ", romaji: "ni" },
  { char: "ヌ", romaji: "nu" },
  { char: "ネ", romaji: "ne" },
  { char: "ノ", romaji: "no" },
  { char: "ハ", romaji: "ha" },
  { char: "ヒ", romaji: "hi" },
  { char: "フ", romaji: "fu" },
  { char: "ヘ", romaji: "he" },
  { char: "ホ", romaji: "ho" },
  { char: "マ", romaji: "ma" },
  { char: "ミ", romaji: "mi" },
  { char: "ム", romaji: "mu" },
  { char: "メ", romaji: "me" },
  { char: "モ", romaji: "mo" },
  { char: "ヤ", romaji: "ya" },
  { char: "ユ", romaji: "yu" },
  { char: "ヨ", romaji: "yo" },
  { char: "ラ", romaji: "ra" },
  { char: "リ", romaji: "ri" },
  { char: "ル", romaji: "ru" },
  { char: "レ", romaji: "re" },
  { char: "ロ", romaji: "ro" },
  { char: "ワ", romaji: "wa" },
  { char: "ヲ", romaji: "wo" },
  { char: "ン", romaji: "n" },
  { char: "ガ", romaji: "ga" },
  { char: "ギ", romaji: "gi" },
  { char: "グ", romaji: "gu" },
  { char: "ゲ", romaji: "ge" },
  { char: "ゴ", romaji: "go" },
  { char: "ザ", romaji: "za" },
  { char: "ジ", romaji: "ji" },
  { char: "ズ", romaji: "zu" },
  { char: "ゼ", romaji: "ze" },
  { char: "ゾ", romaji: "zo" },
  { char: "ダ", romaji: "da" },
  { char: "ヂ", romaji: "ji" },
  { char: "ヅ", romaji: "zu" },
  { char: "デ", romaji: "de" },
  { char: "ド", romaji: "do" },
  { char: "バ", romaji: "ba" },
  { char: "ビ", romaji: "bi" },
  { char: "ブ", romaji: "bu" },
  { char: "ベ", romaji: "be" },
  { char: "ボ", romaji: "bo" },
  { char: "パ", romaji: "pa" },
  { char: "ピ", romaji: "pi" },
  { char: "プ", romaji: "pu" },
  { char: "ペ", romaji: "pe" },
  { char: "ポ", romaji: "po" },
  { char: "キャ", romaji: "kya" },
  { char: "キュ", romaji: "kyu" },
  { char: "キョ", romaji: "kyo" },
  { char: "シャ", romaji: "sha" },
  { char: "シュ", romaji: "shu" },
  { char: "ショ", romaji: "sho" },
  { char: "チャ", romaji: "cha" },
  { char: "チュ", romaji: "chu" },
  { char: "チョ", romaji: "cho" },
  { char: "ニャ", romaji: "nya" },
  { char: "ニュ", romaji: "nyu" },
  { char: "ニョ", romaji: "nyo" },
  { char: "ヒャ", romaji: "hya" },
  { char: "ヒュ", romaji: "hyu" },
  { char: "ヒョ", romaji: "hyo" },
  { char: "ミャ", romaji: "mya" },
  { char: "ミュ", romaji: "myu" },
  { char: "ミョ", romaji: "myo" },
  { char: "リャ", romaji: "rya" },
  { char: "リュ", romaji: "ryu" },
  { char: "リョ", romaji: "ryo" },
  { char: "ギャ", romaji: "gya" },
  { char: "ギュ", romaji: "gyu" },
  { char: "ギョ", romaji: "gyo" },
  { char: "ジャ", romaji: "ja" },
  { char: "ジュ", romaji: "ju" },
  { char: "ジョ", romaji: "jo" },
  { char: "ビャ", romaji: "bya" },
  { char: "ビュ", romaji: "byu" },
  { char: "ビョ", romaji: "byo" },
  { char: "ピャ", romaji: "pya" },
  { char: "ピュ", romaji: "pyu" },
  { char: "ピョ", romaji: "pyo" },
];

const kanaList = [...hiragana, ...katakana];

const Index = () => {
  const [inputValue, setInputValue] = useState("");
  const [charactersOnScreen, setCharactersOnScreen] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [fallSpeed, setFallSpeed] = useState(1.78);
  const inputRef = useRef(null);
  const hrRef = useRef(null);
  const fadeOut = keyframes`
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(1.5); }
  `;

  useEffect(() => {
    if (gameStarted) {
      inputRef.current.focus();
      const interval = setInterval(() => {
        setCharactersOnScreen((prev) => {
          if (prev.length < 5) {
            const newIndex = Math.floor(Math.random() * kanaList.length);
            let newLeft;
            let overlap;
            do {
              newLeft = `${Math.random() * 80 + 10}%`;
              overlap = prev.some((char) => Math.abs(parseFloat(char.left) - parseFloat(newLeft)) < 15);
            } while (overlap);

            const newCharacter = {
              index: newIndex,
              left: newLeft,
              top: 0,
              fontSize: `${(Math.random() * 0.6 + 0.7) * 3}em`,
              fontWeight: "bold",
            };
            return [...prev, newCharacter];
          }
          return prev.map((char) => ({ ...char, top: char.top + fallSpeed })).filter((char) => char.top < 100);
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameStarted, fallSpeed]);

  useEffect(() => {
    if (gameStarted) {
      const interval = setInterval(() => {
        setCharactersOnScreen((prev) => {
          const hrPosition = hrRef.current.getBoundingClientRect().top;
          return prev
            .map((char, idx) => {
              const charPosition = (char.top / 100) * 1000;
              if (charPosition >= hrPosition || (inputValue.trim().toLowerCase() === kanaList[char.index].romaji && correctIndex === null)) {
                if (inputValue.trim().toLowerCase() === kanaList[char.index].romaji && correctIndex === null) {
                  setCorrectIndex(idx);
                  setInputValue("");
                }
                return null;
              }
              return { ...char, top: char.top + fallSpeed };
            })
            .filter(Boolean);
        });
      }, 40);

      return () => clearInterval(interval);
    }
  }, [gameStarted, inputValue, correctIndex, fallSpeed]);

  const checkAnswer = () => {
    const correctKana = kanaList[charactersOnScreen[0].index].romaji;
    if (inputValue.trim().toLowerCase() === correctKana) {
      setCorrectIndex(0);
      setCharactersOnScreen((prev) => prev.slice(1));
      setInputValue("");
      setCorrectIndex(null);
    }
  };

  return (
    <Container centerContent maxW="600px" height="1000px" display="flex" flexDirection="column" justifyContent="center" alignItems="center" position="relative">
      {!gameStarted && (
        <Button
          onClick={() => {
            setGameStarted(true);
            inputRef.current.focus();
          }}
          colorScheme="teal"
          mb={4}
        >
          Start
        </Button>
      )}
      <VStack spacing={4} width="100%" position="absolute" bottom={4} alignItems="center">
        <Slider aria-label="speed-slider" defaultValue={2.67} min={1} max={10} width="80%" onChange={(val) => setFallSpeed(val)}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Box as="hr" width="100%" borderColor="gray.300" ref={hrRef} />
        <Input
          placeholder="Type the romaji here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              checkAnswer();
              inputRef.current.focus();
            } else if (e.key === "Backspace") {
              setInputValue((prev) => prev.slice(0, -1));
            }
          }}
          onBlur={() => {
            if (gameStarted) {
              inputRef.current.focus();
            }
          }}
        />
      </VStack>
      {charactersOnScreen.map((char, i) => (
        <Box key={i} position="absolute" left={char.left} top={`${char.top}%`} p={2}>
          <Text fontSize={char.fontSize} animation={correctIndex === i ? `${fadeOut} 1s forwards` : "none"} color={correctIndex === i ? "green.500" : "black"} fontWeight="bold">
            {kanaList[char.index].char}
          </Text>
        </Box>
      ))}
    </Container>
  );
};

export default Index;
