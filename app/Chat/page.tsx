import { Button } from "@/components/ui/button";

export default function Chat(){
    return(
        <main>
            <h2>프론트에게 물어보세요.</h2>
            <p>무엇을 도와드릴까요? 아래 제안 중 하나를 선택하거나 직접 질문해보세요.</p>

            <div>
                <Button>코드 작성 도움</Button>
            </div>
        </main>
    )
}