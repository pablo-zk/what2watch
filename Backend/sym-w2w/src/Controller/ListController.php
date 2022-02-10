<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\ContentList;
use App\Entity\User;

class ListController extends AbstractController
{
    /**
     * @Route("/lists/{username}", name="list")
     */
    public function index($username): Response
    {
        $user =  $this->getDoctrine()->getRepository(User::class)->findOneBy([
                "username" => $username,
        ]);
        

        $data = [];

        foreach ($user->getLists() as $list){
            $tmp =[
                "id" => $list->getId(),
                "title" =>  $list->getTitle(),
                "icon" => $list->getIcon(),
                "content" => $list->getContent()
            ];
            $data[] = $tmp;
        }
        return $this->json([
            $data,
        ]);
    }

    /**
     * @Route("/list/{id}", name="product-id", methods="get", requirements={"id": "\d+"})
     */
    public function findById($id){

        $list = $this->getDoctrine()->getRepository(ContentList::class)->find($id);

        $data = [
            "id" => $list->getId(),
            "title" =>  $list->getTitle(),
            "icon" => $list->getIcon(),
            "content" => $list->getContent()
        ];

        return $this->json([
            $data
        ]);
    }
    
    /**
     * @Route("/list/add/{username}", name="offer_insert", methods="post")
     */
    public function insertList($username, Request $request): Response{
        $item = json_decode($request->getContent(), true);
        $list = new ContentList();
        $list->setTitle($item['title']);
        $list->setIcon($item['icon']);
        $list->setFilms($item['films']);

        $user =  $this->getDoctrine()->getRepository(User::class)->findOneBy([
            "username" => $username,
        ]);

        $list->setUser($user);
        $em =$this->getDoctrine()->getManager();
        $em->persist($list);
        $em->flush();
        $data = [
            "id" => $list->getId(),
            "title" =>  $list->getTitle(),
            "icon" => $list->getIcon(),
            "films" => $list->getFilms()
        ];

        return $this->json([
            "message" => "OK: Lista creada con exito",
            "list" => $data,
        ]);
    }

    /**
     * @Route("/list/{id}", name="list-update", methods="put")
     */
    public function listUpdate($id, Request $request){

        $em = $this->getDoctrine()->getManager();
        $list = $this->getDoctrine()->getRepository(ContentList::class)->find($id);
        $em->remove($list);

        $item = json_decode($request->getContent(), true);

        $list->setTitle($item['title']);
        $list->setIcon($item['icon']);
        $list->setFilms($item['films']);

        $em->persist($list);
        $em->flush();

        $data = [
            "id" => $list->getId(),
            "title" =>  $list->getTitle(),
            "icon" => $list->getIcon(),
            "films" => $list->getFilms()
        ];

        return $this->json([
            "message" => "List update",
            "list" => $data
        ]);
    }

    /**
     * @Route("/list/{id}", name="list-delete", methods="delete")
     */
    public function listDelete($id){

        $em = $this->getDoctrine()->getManager();
        $list = $this->getDoctrine()->getRepository(ContentList::class)->find($id);

        $em->remove($list);
        $em->flush();

        return $this->json([
            "message" =>"List deleted"
        ]);
    }

    
}
