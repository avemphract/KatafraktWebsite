<template>
    <div id="graphes_connections">
        <PostTitle imgsrc="/advanced-grids.svg">
            Graft Bağlantıları
        </PostTitle>
        <section>
            <p>
                Önceki yazıda graflardan grid şeklinde yapılar tasarlamıştık. Bu yazıda gridlerin arasındaki bağlantıları ve bu bağlantıların dinamik değişimine
                bakacağız. Eğer okumadıysanız öncelikle Graftlardan Gridlere yazımı okumanızı öneririm.
            </p>
            <ReferancePage page-name="Graftlardan Gridlere" />
            <svg
                :id="previewSvg.id"
                class="grids block h-auto m-auto w-200px sm:(w-500px)"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="-0.5 -0.5 5 5">
                <defs>
                    <marker
                        id="arrow-end"
                        orient="auto"
                        markerWidth="2" 
                        markerHeight="2" 
                        refX="0.1" 
                        refY="1">
                        <path
                            d="M0,0 V2 L1.8,1 Z"
                            fill="#747c92"></path>
                    </marker>
                    <marker
                        id="arrow-end-highlighted"
                        orient="auto"
                        markerWidth="2" 
                        markerHeight="2" 
                        refX="0.1" 
                        refY="1">
                        <path
                            d="M0,0 V2 L1.8,1 Z"
                            fill="#202c39"></path>
                    </marker>
                </defs>
            </svg>
        </section>
        <section>
            <ParagraphTitle>Bağlantıların Yönleri</ParagraphTitle>
            <p>
                Önceki yazıda sadece yönsüz bağlantılardan bahsettik. Yönsüz bağlantı düğümlerin her ikisine de bağlantı kurarlar. Böylece bir bağlantı ilişkide
                olduğu her iki nod içinde kullanılabilir durumda olur. Yönü bağlantılarda ise bağlantı sadece bir düğüm için tanımlanır, tek yönlüdür.
            </p>
            <svg
                :id="graphSvg.id"
                class="grids h-auto m-auto w-200px sm:(w-500px)"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="-0.5 -0.5 4 1">
                <defs>
                    <marker
                        id="arrow-end"
                        orient="auto"
                        markerWidth="2" 
                        markerHeight="2" 
                        refX="0.1" 
                        refY="1">
                        <path
                            d="M0,0 V2 L1.8,1 Z"
                            fill="#747c92"></path>
                    </marker>
                    <marker
                        id="arrow-end-highlighted"
                        orient="auto"
                        markerWidth="2" 
                        markerHeight="2" 
                        refX="0.1" 
                        refY="1">
                        <path
                            d="M0,0 V2 L1.8,1 Z"
                            fill="#202c39"></path>
                    </marker>
                </defs>
            </svg>
            <p class="items-center">
                Burada görüldüğü gibi
                <svg
                    :id="nodeSvgs.A.id"
                    class="inline grids align-middle ml-0 w-auto h-30px sm:(h-50px)"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-0.3 -0.3 0.6 0.6"></svg>
                düğümü ile
                <svg
                    :id="nodeSvgs.B.id"
                    class="inline grids align-middle m-0 w-auto h-30px sm:(h-50px)"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-0.3 -0.3 0.6 0.6"></svg>
                düğümü birbirine yönsüz bağlantı ile bağlıdır. Hangisinde olduğunun önemi olmadan birbirine bağlantıları vardır.
            </p>
            <p>
                Yanındaki yönlü bağlantılı düğümlerde bağlantı tek yönlüdür.
                <svg
                    :id="nodeSvgs.C.id"
                    class="inline grids align-middle ml-0 w-auto h-30px sm:(h-50px)"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-0.3 -0.3 0.6 0.6"></svg>
                düğümünden
                <svg
                    :id="nodeSvgs.D.id"
                    class="inline grids align-middle ml-0 w-auto h-30px sm:(h-50px)"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-0.3 -0.3 0.6 0.6"></svg>
                düğümüne bağlantı ile gidilebilir fakat D düğümünden C düğümüne gidilemez.
            </p>
            <p>
                Yönlü bağlantılar sayesinde oyunlarda tekrar bir kere geçildiği zaman tekrar aynı yoldan geri dönülemeyecek bağlantılar yapılabilir. Örnek
                olarak portal, yükseklikten düşüm veya akıntılı nehir gibi. Yönü ve yönsüz bağlantıları beraber kullanmanın en pratik yolu bütün yönleri tek
                yönlü yapmaktır. Yönsüz bağlantılarda ise her iki taraf için ayrı ayrı tek yönlü bağlantı kullanırız.
            </p>
        </section>
        <section>
            <ParagraphTitle>Bağlantı Ağırlıkları</ParagraphTitle>
            <p>
                Aslında bağlantılara istediğimiz her çeşit parametreyi verebiliriz. Ağırlıkta bunlardan biri ve en çok kullanılanı. Ağırlık aslında hareket
                bedeli anlamına gelir ve bir düğümden diğer düğüme gitmek için gereken birim maliyetidir. Aşağıdaki görselde bağlantı kalınlıkları ters orantılı
                olarak gösterilmiştir. Kalın bağlantılardan geçiş maliyeti daha düşükken ince bağlantılardan geçmek daha maliyetlidir. Bağlantı ağırlıkları daha
                sonra anlatacağım yol bulma algoritmalarında daha da anlam kazanacaktır.
            </p>
            <svg
                :id="weightSvg.id"
                class="grids align-middle h-auto m-auto w-200px sm:(w-500px)"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.5 -0.5 4 1"></svg>
            <p class>
                Yukarıdaki bağlantıları tek tek incelersek yazdığım koda göre
                <svg
                    :id="weightNodeSvg[0].id"
                    class="grids inline align-middle ml-0 w-auto h-2 sm:(h-50px)"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-0.3 -0.3 1.6 0.6"></svg>
                bağlantısının ağırlığı 1'dir. Ortadaki bağlantı olan
                <svg
                    :id="weightNodeSvg[1].id"
                    class="grids inline align-middle ml-0 w-auto h-2 sm:(h-50px)"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="+0.7 -0.3 1.6 0.6"></svg>
                bağlantısının ağırlığı 5'dir. Son olarak
                <svg
                    :id="weightNodeSvg[2].id"
                    class="grids inline align-middle ml-0 w-auto h-2 sm:(h-50px)"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="+1.7 -0.3 1.6 0.6"></svg>
                bağlantısının ağırlığı 1'dir.
            </p>
            <CodeBlock
                code-map-path="/codesamples/posts/graphes_connections"
                :index="0" />
        </section>

        <section>
            <ParagraphTitle>Yönlü ve Ağırlıklı Grid yapısı</ParagraphTitle>
            <svg
                :id="weightGridSvg.id"
                class="grids block h-auto m-auto w-200px sm:(w-500px)"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="-0.5 -0.5 3 3">
                <defs>
                    <marker
                        id="arrow-end"
                        orient="auto"
                        markerWidth="2" 
                        markerHeight="2" 
                        refX="0.1" 
                        refY="1">
                        <path
                            d="M0,0 V2 L1.8,1 Z"
                            fill="#747c92"></path>
                    </marker>
                    <marker
                        id="arrow-end-highlighted"
                        orient="auto"
                        markerWidth="2" 
                        markerHeight="2" 
                        refX="0.1" 
                        refY="1">
                        <path
                            d="M0,0 V2 L1.8,1 Z"
                            fill="#202c39"></path>
                    </marker>
                </defs>
            </svg>
            <p>Griddeki her bir düğümü ve bu düğümlerin sahip olduğu bağlantıları aşağıdaki gibi gösterebiliriz</p>
            <ol>
                <li>
                    <p>Düğümler</p>
                    <div class="flex gap-10px">
                        <svg
                            v-for="node in weightGridNodeSvgs.keys()"
                            :id="node.id"
                            :key="node.node.name"
                            class="grids h-auto m-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="-0.3 -0.3 0.6 0.6"></svg>
                    </div>
                </li>
                <li>
                    <p>Herbir düğümün bağlantılarının kümesi</p>
                    <div
                        v-for="node in weightGridNodeSvgs.keys()"
                        :key="node.node.name + ''"
                        class="top-0 my-2 text-size-1.5rem font-semibold border-solid border-0 border-b-1px border-dark-900 border box-content py-1 px-4 flex">
                        <span class="leading-loose font-mono self-center">{{ node.node.name }}→&emsp;</span>
                        <div>
                            <svg
                                v-for="connection in weightGridNodeSvgs.get(node)"
                                :id="connection.id"
                                :key="connection.connection.from.name + ''"
                                class="grids inline align-middle w-auto mx-2 m-auto h-30px sm:(h-50px)"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="-1 -0.25 2.1 0.5">
                                <defs>
                                    <marker
                                        id="arrow-end"
                                        orient="auto"
                                        markerWidth="2" 
                                        markerHeight="2" 
                                        refX="0.1" 
                                        refY="1">
                                        <path
                                            d="M0,0 V2 L1.8,1 Z"
                                            fill="#747c92"></path>
                                    </marker>
                                    <marker
                                        id="arrow-end-highlighted"
                                        orient="auto"
                                        markerWidth="2" 
                                        markerHeight="2" 
                                        refX="0.1" 
                                        refY="1">
                                        <path
                                            d="M0,0 V2 L1.8,1 Z"
                                            fill="#202c39"></path>
                                    </marker>
                                </defs>
                                <text
                                    transform="matrix(1,0,0,1,-0.8,0)"
                                    style="
                                        transform-origin: 0px 0px;
                                        fill: black;
                                        font-size: 0.3px;
                                        pointer-events: none;
                                        dominant-baseline: middle;
                                        text-anchor: middle;
                                        alignment-baseline: central;
                                    ">
                                    {{ node.node.name }}
                                </text>
                                <text
                                    transform="matrix(1,0,0,1,0.8,0)"
                                    style="
                                        transform-origin: 0px 0px;
                                        fill: black;
                                        font-size: 0.3px;
                                        pointer-events: none;
                                        dominant-baseline: middle;
                                        text-anchor: middle;
                                        alignment-baseline: central;
                                    ">
                                    {{ node.node == connection.connection.to ? node.node.name : connection.connection.to.name }}
                                </text>
                            </svg>
                        </div>
                    </div>
                </li>
            </ol>
        </section>

        <section>
            <ParagraphTitle>Bağlantıların dinamik değişimi</ParagraphTitle>
            <p>
                Bağlantıları ağırlıklarını dinamik olarak değiştirebiliriz. Eğer bir bağlantının yok olmasını istiyorsak ta ona çok büyük bir ağırlık değeri
                veririz. Böyle teorik olarak bağlantı olmasına rağmen pratikte o bağlantı hiç kullanılmayacaktır.
            </p>
            <svg
                :id="dynamicGridSvg.id"
                class="border-2px border-solid block h-auto m-auto w-200px sm:(w-500px)"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.5 -0.5 10 10">
                <defs>
                    <marker
                        id="arrow-end"
                        orient="auto"
                        markerWidth="2" 
                        markerHeight="2" 
                        refX="0.1" 
                        refY="1">
                        <path
                            d="M0,0 V2 L1.8,1 Z"
                            fill="#747c92"></path>
                    </marker>
                    <marker
                        id="arrow-end-highlighted"
                        orient="auto"
                        markerWidth="2" 
                        markerHeight="2" 
                        refX="0.1" 
                        refY="1">
                        <path
                            d="M0,0 V2 L1.8,1 Z"
                            fill="#202c39"></path>
                    </marker>
                </defs>
            </svg>
            <p>
                Yukarıdaki görselde sürüklenebilir görseller bağlantıların ağırlığını arttırmaktadır. Sarı dörtgen bağlantıların ağırlığını biraz arttırmakta bu
                yüzden bağlantılar hala kullanılabilmektedir. Kırmızı dörtgen ise bağlantıların ağırlık maliyeti çok fazla arttırdığı için teorikte bağlantıyı
                yoketmese bile kullanımını pratikte ortadan kaldırmaktadır.
            </p>
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CodeBlock from "@/components/CodeBlock.vue";
import PostTitle from "@/components/PostTitle.vue";
import ParagraphTitle from "@/components/ParagraphTitle.vue";
import { WeightedGridSvg, WeightedNamedGridSvg } from "@/utils/posts/graphes_connections/PreviewGraph";
import { Node2D } from "@/utils/posts/Node2D";
import { BiDirectional2DConnection, BiDirectionalWeight2DConnection, Directional2DConnection } from "@/utils/posts/Connections2D";
import { GraphMap2D } from "@/utils/posts/Map2D";
import { SingleConnectionMap2D, SingleNodeGraphMap2D } from "@/utils/posts/SingleMap";
import DynamicGridSvg from "@/utils/posts/graphes_connections/DynamicGridSvg";

const previewSvg = new WeightedGridSvg(
    "preview-svg",
    5,
    5,
    [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
    ],
    0.5
);

const A = new Node2D(0, 0, "A");
const B = new Node2D(1, 0, "B");
const C = new Node2D(2, 0, "C");
const D = new Node2D(3, 0, "D");
new BiDirectional2DConnection(A, B);
new Directional2DConnection(C, D);

const graphSvg = new GraphMap2D("a_bSvg", [A, B, C, D], 0.5);
const nodeSvgs = {
    A: new SingleNodeGraphMap2D("aSvg", A, 0.5),
    B: new SingleNodeGraphMap2D("bSvg", B, 0.5),
    C: new SingleNodeGraphMap2D("cSvg", C, 0.5),
    D: new SingleNodeGraphMap2D("dSvg", D, 0.5)
};
const A2 = new Node2D(0, 0, "A");
const B2 = new Node2D(1, 0, "B");
const C2 = new Node2D(2, 0, "C");
const D2 = new Node2D(3, 0, "D");
new BiDirectionalWeight2DConnection(A2, B2, 1);
new BiDirectionalWeight2DConnection(B2, C2, 0.6);
new BiDirectionalWeight2DConnection(C2, D2, 0.1);

const weightSvg = new GraphMap2D("weightSvg", [A2, B2, C2, D2], 0.5);
const weightNodeSvg = [
    new GraphMap2D("weight_a_bSvg", [A2, B2], 0.5),
    new GraphMap2D("weight_b_cSvg", [B2, C2], 0.5),
    new GraphMap2D("weight_c_dSvg", [C2, D2], 0.5)
];

const weightGridSvg = new WeightedNamedGridSvg(
    "weightGridSvg",
    3,
    3,
    [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
    ],
    0.5
);
const weightGridNodeSvgs: Map<SingleNodeGraphMap2D, SingleConnectionMap2D[]> = new Map<SingleNodeGraphMap2D, SingleConnectionMap2D[]>();
const weightGridNodes = weightGridSvg.getNodes();
for (let i = 0; i < weightGridNodes.length; i++) {
    console.log(weightGridNodes[i].name);
    weightGridNodeSvgs.set(
        new SingleNodeGraphMap2D("weightGridNodes" + weightGridNodes[i].name, weightGridNodes[i], 0.5),
        weightGridNodes[i].connections.map((m) => new SingleConnectionMap2D("weightGridNodes" + weightGridNodes[i].name + m.from.name + m.to.name, m, 0.4))
    );
}

const dynamicGridSvg = new DynamicGridSvg(10, 10, "dynamic-grid-svg");

definePageMeta(
    {
        layout: "post-layout",
        type: "Post",
        titleImage: "/posts-symbols/advanced-grids.svg",
        introduction: `Önceki yazıda graflardan grid şeklinde yapılar tasarlamıştık. Bu yazıda gridlerin arasındaki bağlantıları ve bu bağlantıların dinamik değişimine
                bakacağız. Eğer okumadıysanız öncelikle Graftlardan Gridlere yazımı okumanızı öneririm.`.replaceAll("\n"," "),
        name: "Graft Bağlantıları",
        order: 2
    }
);
export default defineComponent({
    components: { CodeBlock, PostTitle, ParagraphTitle },
    data() {
        return {
            previewSvg: previewSvg,
            graphSvg: graphSvg,
            nodeSvgs: nodeSvgs,
            weightSvg: weightSvg,
            weightNodeSvg: weightNodeSvg,
            weightGridSvg: weightGridSvg,
            weightGridNodeSvgs: weightGridNodeSvgs,
            dynamicGridSvg: dynamicGridSvg
        };
    },
    
    meta: {
        type: "Post",
        titleImage: "/posts-symbols/graphes-grids.svg"
    },
    mounted() {
        previewSvg.mounted();
        graphSvg.mounted();
        nodeSvgs.A.mounted();
        nodeSvgs.B.mounted();
        nodeSvgs.C.mounted();
        nodeSvgs.D.mounted();
        weightSvg.mounted();
        weightNodeSvg.forEach((w) => w.mounted());

        weightGridSvg.mounted();
        [...weightGridNodeSvgs.keys()].forEach((f) => {
            f.mounted();
            weightGridNodeSvgs.get(f).forEach((c) => c.mounted());
        });
        dynamicGridSvg.mounted();
    }
});
</script>

<style lang="scss">
.grids {
    .node {
        fill: #38a3a5;
        stroke: #22577a;
        stroke-width: 0.04px;
    }
    .node.highlighted {
        fill: #f13030;
        stroke: #5a0001;
    }

    .connection {
        marker-end: url(#arrow-end);
        stroke: #747c92;
    }
    .connection.highlighted {
        marker-end: url(#arrow-end-highlighted);
        stroke: #202c39;
    }
    .grid {
        fill: #38a3a511;
        stroke-width: 0.04px;
        stroke: #23587b88;
    }
}
#dynamic-grid-svg {
    .node {
        fill: #38a3a5;
        stroke: #22577a;
        stroke-width: 0.04px;
    }
    .connection {
        marker-end: url(#arrow-end);
        stroke: #747c92;
    }
    .connection.hidden {
        fill: transparent;
        stroke: transparent;
    }
    .collide {
        stroke: #202c39;
        stroke-width: 0.025px;
    }
}
</style>
