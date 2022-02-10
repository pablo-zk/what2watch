<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\ContentList;
use App\Entity\Content;
class ContentController extends AbstractController
{
    /**
     * @Route("/content", name="content")
     */
    public function index(): Response
    {
        return $this->render('content/index.html.twig', [
            'controller_name' => 'ContentController',
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

        $list =  $this->getDoctrine()->getRepository(User::class)->findOne($idList);

        $content->addContentList($list);
        $em =$this->getDoctrine()->getManager();
        $em->persist($content);
        $em->flush();
        $data = [
            "id" => $content->getId(),
            "idContent" =>  $content->getIdContent(),
            "title" => $content->getTitle(),
            "cover" => $content->getCover()
        ];

        return $this->json([
            "message" => "OK: Contenido añadido con exito",
            "content" => $data,
        ]);
    }
}
