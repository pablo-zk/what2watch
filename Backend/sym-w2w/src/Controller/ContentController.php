<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\ContentList;
use App\Entity\Content;
class ContentController extends AbstractController
{
    /**
     * @Route("/content/{idList}", name="content",methods="get")
     */
    public function index($idList): Response
    {
        $list = $this->getDoctrine()->getRepository(ContentList::class)->find($idList);

        $data = [];
        foreach ($list->getContent() as $content){
            $tmp =[
                "id" => $content->getId(),
                "idContent" => $content->getIdContent(),
                "title" =>  $content->getTitle(),
                "cover" => $content->getCover(),
                "media_type" => $content->getMediaType()
            ];
            $data[] = $tmp;
        }
        return $this->json([
            $data,
        ]);
    }

    /**
     * @Route("/content/add/{idList}", name="content_insert", methods="post")
     */
    public function insertContent($idList, Request $request): Response{
        $item = json_decode($request->getContent(), true);
        $content = new Content();
        $content->setIdContent($item['idContent']);
        $content->setTitle($item['title']);
        $content->setCover($item['cover']);
        $content->setMediaType($item['media_type']);
        $list =  $this->getDoctrine()->getRepository(ContentList::class)->findOneBy([
            "id" => $idList
        ]);

        //Comprobar que la pelicula/serie que se añade a la lista, no este ya añadida
        foreach ($list->getContent() as $cont){
            if($cont->getIdContent() == $content->getIdContent()){
                return $this->json([
                    "message" => "ERROR: Pelicula/serie ya añadida a la lista " . $list->getTitle(),
                ]);
            }
        }

        $content->addContentList($list);
        $em =$this->getDoctrine()->getManager();
        $em->persist($content);
        $em->flush();
        $data = [
            "id" => $content->getId(),
            "idContent" =>  $content->getIdContent(),
            "title" => $content->getTitle(),
            "cover" => $content->getCover(),
            "media_type" => $content->getMediaType()
        ];

        return $this->json([
            "message" => "OK: Contenido añadido con exito",
            "idList" => $idList,
            "content" => $data,
        ]);
    }
    
    /**
     * @Route("/content/{idCon}", name="content-delete", methods="delete")
     */
    public function contentDelete($idCon){

        $em = $this->getDoctrine()->getManager();
        $content = $this->getDoctrine()->getRepository(Content::class)->find($idCon);

        $em->remove($content);
        $em->flush();

        return $this->json([
            "message" =>"Content deleted"
        ]);
    }
}
