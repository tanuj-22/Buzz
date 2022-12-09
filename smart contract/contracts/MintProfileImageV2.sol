// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract ProfileImageNfts is ERC721, ERC721Burnable,Ownable {

    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter _tokenIds;
    mapping(uint256 => string) _tokenURIs;

    struct RenderToken{
        uint256 id;
        string uri;
        string space;
    }

    constructor() ERC721("ProfileImageNftsV2","PIN2"){


    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId),"URI not exist on that ID");
        string memory _RUri =  _tokenURIs[tokenId];
        return _RUri;
    }

    function getAlltoken() public view returns (RenderToken[] memory){
        uint256 latestId = _tokenIds.current();
        RenderToken[] memory res = new RenderToken[](latestId);
        for(uint256 i = 0; i  <= latestId ; i++){
            if(_exists(i)){
                string memory uri = tokenURI(i);
                res[i] = RenderToken(i,uri," ");
            }
        }
        return res;
    }

    function mint(address recipents, string memory _uri) public returns (uint256){
        uint256 newId = _tokenIds.current();
        _mint(recipents,newId);
        _setTokenURI(newId,_uri);
        _tokenIds.increment();
        return newId;
    }

    function burn(uint256 tokenId) public override{
        require(_exists(tokenId),"URI not exist on that ID");
        require(msg.sender == ownerOf(tokenId) || msg.sender == owner());
        super._burn(tokenId);
    }

    function _setTokenURIOverride(uint256 tokenId, string memory _tokenURI) public {
        require(msg.sender == owner());
        require(_exists(tokenId),"URI not exist on that ID");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function Destruct() public {
        require(msg.sender == owner());
        address payable addr = payable(owner());
        selfdestruct(addr);
    }



    
}