import Head from 'next/head'
import { useEffect, useRef, useState, useCallback } from 'react'
import styles from '@/styles/Home.module.css'

const emojis = [
  '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚', 
  '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😶‍🌫️', '😏', '😒', 
  '🙄', '😬', '😮‍💨', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '😵‍💫', 
  '🤯', '🤠', '🥳', '🥸', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', 
  '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩'
];

const quotes = [
  '微笑吧,反正你也什么都改变不了。',
  '眼泪是给自己看的,伤心别人也不会懂。',
  '爱情就像UFO,听说过,但没见过。',
  '生气是拿别人的错误惩罚自己。',
  '思考人生的意义,不如思考晚餐吃什么。',
  '装酷的人生,冷酷的人生。',
  '睡觉是唯一不用花钱就能享受的奢侈品。',
  '庆祝吧,反正明天还是要上班。',
  '害怕失败的人,连失败的机会都没有。',
  '不是我不懂,只是我不想懂。',
  '人生就像打电话,不是你先挂就是对方先挂。',
  '钱不是万能的,但没钱是万万不能的。',
  '别灰心,漂亮姑娘和天上的星星一样,看得见摸不着。',
  '上帝为你关上一扇门,还会顺手把窗户也关上。',
  '不要看别人表面上一帆风顺,实际上他们背地里也一帆风顺。',
  '世上无难事,只要肯放弃。',
  '努力不一定成功,但不努力一定很轻松。',
  '人生不如意之事十之八九,剩下的十之一二也不如意。',
  '没有人能让你放弃梦想,你自己就可以。',
  '人生就像心电图,一帆风顺就证明你挂了。',
  '别人的人生是马拉松,你的人生是摸鱼松。',
  '不要轻易向命运低头,因为你的头本来就很低了。',
  '年轻时我以为钱就是一切,现在老了才知道,钱确实就是一切。',
  '别抱怨手机电量不够,是你的人生没有充够电。',
  '只要你肯努力,没有什么是你搞不砸的。',
  '人生就像玩游戏,你可以选择容易模式,但你选不了玩家。',
  '不要总是活在过去,因为你的未来也不咋地。',
  '别人都在努力成为自己,你努力成为别人就够了。',
  '你不努力,对不起父母;你努力了,对不起自己。',
  '别人的白天是白天,你的白天是黑夜。',
  '你以为你是主角,其实你是群演,而且还是在别人的戏里。',
  '不要轻易许下承诺,因为你连自己都搞不定。',
  '你以为你是锦鲤,其实你是咸鱼。',
  '别人都在为未来焦虑,你连现在都不知道怎么过。',
  '你不是失败,你只是还没找到能力范围内的成功。',
  '别人都在努力成为更好的人,你只需要努力成为一个人。',
  '你不是废物,你是高级废物。',
  '别人的生活是诗,你的生活是shi。',
  '你以为你是一只蝴蝶,其实你是一只蛀虫。',
  '不要总是羡慕别人,因为别人也羡慕别人。',
  '你的人生就像一部电影,可惜是烂片。',
  '别人都在努力奔向成功,你在努力奔向五环。',
  '你不是单身,你只是在等待更好的单身。',
  '别人是按月领工资,你是按月领痛苦。',
  '你不是懒,你只是在等待灵感,等了好几年。',
  '别人的梦想是改变世界,你的梦想是改变发型。',
  '你不是胖,你只是离成功更近了一步。',
  '别人都在努力成为巨人,你在努力成为巨婴。',
  '你不是孤独,你是自带社交障碍光环。',
  '别人都在努力往上爬,你在努力往下掉。',
  '你不是运气不好,你是烂命一条。',
  '别人的生活是小说,你的生活是说明书。',
  '你不是丑,你只是长得有创意。',
  '别人都在努力成为人上人,你在努力成为人间人。',
  '你不是没有追求,你只是追求比较特别。',
  '别人都在为房子发愁,你在为房租发愁。',
  '你不是没有才华,你只是才华压制了你的人生。',
  '别人都在努力成为成功人士,你在努力成为失败专家。',
  '你不是没有朋友,你只是和自己做得太好朋友了。',
  '别人都在努力实现梦想,你在努力实现睡眠。',
  '你不是选择困难症,你只是没得选。',
  '别人是在看风景,你是在看空气。',
  '你不是内向,你只是不想说话浪费口水。',
  '别人是享受生活,你是在生活中挣扎。',
  '你不是没有目标,你的目标就是没有目标。',
  '别人在看到希望,你在希望能看到。',
  '你不是不合群,你只是和别的物种更合得来。',
  '别人是活在当下,你是活在梦里。',
  '你不是运气差,你只是不走运专业户。',
  '别人是有故事的人,你是有事故的人。',
  '你不是记性差,你只是记住了太多没用的东西。',
  '别人是在充实生活,你是在充胖自己。',
  '你不是不会社交,你只是不想浪费表情。',
  '别人是在努力工作,你是在努力找工作。',
  '你不是不会理财,你只是没有财可理。',
  '别人是在寻找自我,你是在寻找厕所。',
  '你不是不会表达,你只是不知道说什么。',
  '别人是在享受美食,你是在享受泡面。',
  '你不是不会恋爱,你只是不会被爱。',
  '别人是在看书充电,你是在看书充睡。',
  '你不是不会规划,你的人生就是一张白纸。',
  '别人是在努力减肥,你是在努力找胖。',
  '你不是没有想法,你的想法就是没有想法。',
  '别人是在寻找快乐,你是在快乐地寻找。',
  '你不是不会赚钱,你只是不会存钱。',
  '别人是在谈恋爱,你是在谈人生。',
  '你不是不会做决定,你只是决定不做决定。',
  '别人是在努力成长,你是在努力长胖。',
  '你不是不会化妆,你只是不想吓到别人。',
  '别人是在寻找方向,你是在寻找借口。',
  '你不是没有机会,你只是错过了所有机会。',
  '别人是在追求梦想,你是在做梦。',
  '你不是不够优秀,你只是优秀得不够明显。',
  '别人是在努力奋斗,你是在奋斗着努力。',
  '你不是不会投资,你只是在投资失败上很有天赋。',
  '别人是在寻找灵感,你是在灵感中寻找自己。',
  '你不是不会交际,你只是不想浪费时间在无意义的社交上。',
  '别人是在享受假期,你是在假期中享受加班。',
  '你不是不懂幽默,你的人生就是个笑话。',
  '别人是在努力变得更好,你是在努力不变得更糟。',
];

// 确保quotes数组长度与emojis数组长度相同
while (quotes.length < emojis.length) {
  quotes.push(`这是第${quotes.length + 1}条毒鸡汤,请自行体会。`);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [emojiPosition, setEmojiPosition] = useState({ x: 0, y: 0 });
  const [currentEmoji, setCurrentEmoji] = useState('');
  const [currentQuote, setCurrentQuote] = useState('');
  
  // 新增: 用于存储方向的 ref
  const directionRef = useRef({ x: 1, y: 1 });

  const moveEmoji = useCallback(() => {
    const speed = 2;
    let animationFrameId: number;

    const animate = () => {
      setEmojiPosition(prev => {
        let newX = prev.x + speed * directionRef.current.x;
        let newY = prev.y + speed * directionRef.current.y;

        if (newX <= 0 || newX >= window.innerWidth - 64) {
          directionRef.current.x *= -1;
          newX = Math.max(0, Math.min(newX, window.innerWidth - 64));
        }
        if (newY <= 0 || newY >= window.innerHeight - 64) {
          directionRef.current.y *= -1;
          newY = Math.max(0, Math.min(newY, window.innerHeight - 64));
        }

        return { x: newX, y: newY };
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  useEffect(() => {
    const createEmojiAndQuote = () => {
      const index = Math.floor(Math.random() * emojis.length);
      setCurrentEmoji(emojis[index]);
      setCurrentQuote(quotes[index]);
      setEmojiPosition({
        x: Math.random() * (window.innerWidth - 64),
        y: Math.random() * (window.innerHeight - 64)
      });
      // 重置方向
      directionRef.current = {
        x: Math.random() > 0.5 ? 1 : -1,
        y: Math.random() > 0.5 ? 1 : -1
      };
    };

    createEmojiAndQuote();
    const moveCleanup = moveEmoji();
    const interval = setInterval(createEmojiAndQuote, 10000);

    return () => {
      clearInterval(interval);
      moveCleanup();
    };
  }, [moveEmoji]);

  useEffect(() => {
    const handleClick = () => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <Head>
        <title>情绪emoji世界</title>
        <meta name="description" content="一个充满情绪和毒鸡汤的动画世界" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap" rel="stylesheet" />
      </Head>
      <main className={styles.main} ref={containerRef}>
        <div className={styles.backgroundWave}></div>
        <div
          style={{
            position: 'absolute',
            left: `${emojiPosition.x}px`,
            top: `${emojiPosition.y}px`,
            fontSize: '64px',
            zIndex: 1,
          }}
        >
          {currentEmoji}
        </div>
        <div className={styles.quoteContainer}>
          <p className={styles.quote}>{currentQuote}</p>
        </div>
      </main>
      <audio ref={audioRef} loop>
        <source src="/relaxing-music.mp3" type="audio/mpeg" />
      </audio>
    </>
  )
}